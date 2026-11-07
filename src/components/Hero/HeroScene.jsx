import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ---------- palette (raw sRGB values for the shaders) ---------- */
const INK = [0.353, 0.212, 0.133]; // chocolate
const ACCENT = [0.435, 0.114, 0.169]; // maroon

/* ---------- deterministic random so the brain is identical every load ---------- */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- neural brain: nodes + links, with pulses travelling along links ---------- */
function buildBrain() {
  const rand = mulberry32(42);
  const pts = [];

  const surface = 250;
  for (let i = 0; i < surface; i++) {
    // uniform direction on a sphere
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    let dx = s * Math.cos(th);
    let dy = u;
    let dz = s * Math.sin(th);

    // folds (gyri) as a gentle radial modulation
    const fold = 1 + 0.07 * Math.sin(dx * 7 + dy * 3) * Math.cos(dz * 6 + dy * 4);
    const r = (rand() < 0.86 ? 1 : 0.55 + rand() * 0.35) * fold;

    let x = dx * 1.5 * r;
    let y = dy * 1.08 * r;
    let z = dz * 1.2 * r;

    if (y < 0) y *= 0.72; // flatter underside
    x += Math.sign(x || 1) * 0.1 * (1 - Math.abs(dy) * 0.4); // longitudinal fissure
    pts.push([x, y, z]);
  }

  // cerebellum cluster, low and to the back
  for (let i = 0; i < 38; i++) {
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    pts.push([s * Math.cos(th) * 0.62, -0.78 + u * 0.3, -0.72 + s * Math.sin(th) * 0.4]);
  }

  // links: each node to its nearest neighbours
  const maxD = 0.62;
  const seen = new Set();
  const segs = [];
  for (let i = 0; i < pts.length; i++) {
    const near = [];
    for (let j = 0; j < pts.length; j++) {
      if (i === j) continue;
      const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1], pts[i][2] - pts[j][2]);
      if (d < maxD) near.push([d, j]);
    }
    near.sort((a, b) => a[0] - b[0]);
    near.slice(0, 3).forEach(([, j]) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) return;
      seen.add(key);
      segs.push([i, j]);
    });
  }

  const nodePos = new Float32Array(pts.length * 3);
  const nodePhase = new Float32Array(pts.length);
  const nodeSize = new Float32Array(pts.length);
  pts.forEach((p, i) => {
    nodePos.set(p, i * 3);
    nodePhase[i] = rand();
    nodeSize[i] = 3.2 + rand() * 4.2;
  });

  const linePos = new Float32Array(segs.length * 6);
  const lineT = new Float32Array(segs.length * 2);
  const lineSeed = new Float32Array(segs.length * 2);
  segs.forEach(([a, b], i) => {
    linePos.set(pts[a], i * 6);
    linePos.set(pts[b], i * 6 + 3);
    lineT[i * 2] = 0;
    lineT[i * 2 + 1] = 1;
    const sd = rand();
    lineSeed[i * 2] = sd;
    lineSeed[i * 2 + 1] = sd;
  });

  return { nodePos, nodePhase, nodeSize, linePos, lineT, lineSeed };
}

const POINT_VERT = /* glsl */ `
  attribute float aPhase;
  attribute float aSize;
  uniform float uTime;
  uniform float uPixel;
  varying float vPulse;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float p = 0.5 + 0.5 * sin(uTime * 1.1 + aPhase * 6.2831);
    vPulse = p;
    gl_PointSize = aSize * (0.8 + 0.45 * p) * uPixel * (7.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const POINT_FRAG = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vPulse;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.18, d);
    float glow = pow(vPulse, 4.0);
    vec3 col = mix(uInk, uAccent, glow);
    gl_FragColor = vec4(col, a * (0.5 + 0.5 * vPulse));
  }
`;
const LINE_VERT = /* glsl */ `
  attribute float aT;
  attribute float aSeed;
  varying float vT;
  varying float vSeed;
  void main() {
    vT = aT;
    vSeed = aSeed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const LINE_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vT;
  varying float vSeed;
  void main() {
    float head = fract(uTime * 0.16 + vSeed * 3.7);
    float d = abs(vT - head);
    float glow = smoothstep(0.22, 0.0, d);
    vec3 col = mix(uInk, uAccent, glow);
    gl_FragColor = vec4(col, 0.16 + 0.72 * glow);
  }
`;

function NeuralBrain() {
  const group = useRef(null);
  const pointMat = useRef(null);
  const lineMat = useRef(null);
  const data = useMemo(buildBrain, []);

  const uniformsPoint = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixel: { value: 1 },
      uInk: { value: new THREE.Vector3(...INK) },
      uAccent: { value: new THREE.Vector3(...ACCENT) },
    }),
    [],
  );
  const uniformsLine = useMemo(
    () => ({
      uTime: { value: 0 },
      uInk: { value: new THREE.Vector3(...INK) },
      uAccent: { value: new THREE.Vector3(...ACCENT) },
    }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    uniformsPoint.uTime.value = t;
    uniformsPoint.uPixel.value = state.gl.getPixelRatio();
    uniformsLine.uTime.value = t;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.22) * 0.55;
      group.current.rotation.x = Math.sin(t * 0.17) * 0.06;
      group.current.position.y = 0.62 + Math.sin(t * 0.6) * 0.05;
      const s = 1 + Math.sin(t * 0.8) * 0.012;
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group} position={[0, 0.62, 0]}>
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.linePos, 3]} />
          <bufferAttribute attach="attributes-aT" args={[data.lineT, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[data.lineSeed, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={lineMat}
          uniforms={uniformsLine}
          vertexShader={LINE_VERT}
          fragmentShader={LINE_FRAG}
          transparent
          depthWrite={false}
        />
      </lineSegments>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.nodePos, 3]} />
          <bufferAttribute attach="attributes-aPhase" args={[data.nodePhase, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[data.nodeSize, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pointMat}
          uniforms={uniformsPoint}
          vertexShader={POINT_VERT}
          fragmentShader={POINT_FRAG}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ---------- palette ---------- */
const CHOC = '#5a3622';
const MAROON = '#6f1d2b';

/* ---------- orbit rings + floating tech fragments ---------- */
function Orbit({ radius, tilt, speed, color, dot }) {
  const dotRef = useRef(null);
  const ring = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      const a = (i / 120) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  useFrame((state) => {
    const a = state.clock.elapsedTime * speed;
    if (dotRef.current) dotRef.current.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
  });

  return (
    <group rotation={tilt} position={[0, 0.62, 0]}>
      <line geometry={ring}>
        <lineBasicMaterial color={color} transparent opacity={0.22} />
      </line>
      <mesh ref={dotRef}>
        <sphereGeometry args={[dot, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function Fragments() {
  const group = useRef(null);
  const items = useMemo(() => {
    const rnd = mulberry32(99);
    return Array.from({ length: 9 }, (_, i) => ({
      pos: [(rnd() - 0.5) * 6, (rnd() - 0.4) * 4.2, -0.5 - rnd() * 1.6],
      size: 0.08 + rnd() * 0.1,
      kind: i % 3,
      speed: 0.2 + rnd() * 0.35,
      phase: rnd() * 6,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current?.children.forEach((c, i) => {
      const it = items[i];
      c.position.y = it.pos[1] + Math.sin(t * it.speed + it.phase) * 0.18;
      c.rotation.x = t * it.speed;
      c.rotation.y = t * it.speed * 0.7;
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos}>
          {it.kind === 0 ? (
            <octahedronGeometry args={[it.size * 1.4]} />
          ) : it.kind === 1 ? (
            <icosahedronGeometry args={[it.size * 1.3, 0]} />
          ) : (
            <boxGeometry args={[it.size * 1.6, it.size * 1.6, it.size * 1.6]} />
          )}
          <meshBasicMaterial color={i % 4 === 0 ? MAROON : CHOC} wireframe transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}



/* ---------- whole scene with soft pointer parallax ---------- */
function Scene() {
  const root = useRef(null);

  useFrame((state) => {
    if (!root.current) return;
    const { x, y } = state.pointer;
    root.current.rotation.y += (x * 0.18 - root.current.rotation.y) * 0.04;
    root.current.rotation.x += (-y * 0.1 - root.current.rotation.x) * 0.04;
  });

  return (
    <group ref={root}>
      <Fragments />
      <Orbit radius={2.15} tilt={[1.15, 0, 0.25]} speed={0.45} color={MAROON} dot={0.05} />
      <Orbit radius={2.5} tilt={[0.55, 0, -0.5]} speed={-0.3} color={CHOC} dot={0.045} />
      <NeuralBrain />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-canvas-wrap">
      <Canvas
        camera={{ position: [0, 0.05, 6.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
