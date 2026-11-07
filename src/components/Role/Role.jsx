import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { LogoMark } from '../Logo/Logo';
import './Role.css';

const SKILLS = [
  // inner ring
  { id: 'react', name: 'React.js', icon: 'fab fa-react', color: '#2a9bb8', desc: 'Component architecture and hooks' },
  { id: 'flutter', name: 'Flutter', icon: 'fas fa-mobile-screen', color: '#02569B', desc: 'Cross-platform mobile apps' },
  { id: 'python', name: 'Python', icon: 'fab fa-python', color: '#3776ab', desc: 'AI agents, automation and ML' },
  { id: 'javascript', name: 'JavaScript', icon: 'fab fa-js', color: '#c9a400', desc: 'Modern async code and core logic' },
  { id: 'dart', name: 'Dart', icon: 'fas fa-terminal', color: '#0175C2', desc: 'The language behind Flutter' },
  { id: 'csharp', name: 'C# / .NET', icon: 'fas fa-laptop-code', color: '#9b4f96', desc: 'Enterprise systems' },
  { id: 'langchain', name: 'LangChain', icon: 'fas fa-robot', color: '#1f8f6a', desc: 'LLM agents and prompt chains' },
  // outer ring
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#2a9bb8', desc: 'Utility-first styling' },
  { id: 'firebase', name: 'Firebase', icon: 'fas fa-fire', color: '#d98a00', desc: 'Realtime sync and auth' },
  { id: 'sql', name: 'SQL', icon: 'fas fa-database', color: '#d4651a', desc: 'Data modeling and queries' },
  { id: 'html5', name: 'HTML5', icon: 'fab fa-html5', color: '#e34c26', desc: 'Accessible, semantic markup' },
  { id: 'css3', name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264de4', desc: 'Layout and motion' },
  { id: 'cpp', name: 'C++ & DSA', icon: 'fas fa-code', color: '#3b6fc4', desc: 'Algorithms and fast compute' },
  { id: 'redux', name: 'Redux Toolkit', icon: 'fas fa-cubes-stacked', color: '#764abc', desc: 'Global state management' },
  { id: 'git', name: 'Git & GitHub', icon: 'fab fa-git-alt', color: '#f05032', desc: 'Version control and branching' },
  { id: 'figma', name: 'Figma', icon: 'fab fa-figma', color: '#a259ff', desc: 'UI design and prototyping' },
  { id: 'streamlit', name: 'Streamlit', icon: 'fas fa-chart-line', color: '#e0383e', desc: 'AI dashboards and prototypes' },
  { id: 'n8n', name: 'n8n', icon: 'fas fa-network-wired', color: '#ea580c', desc: 'Automated workflows' },
  { id: 'aspnet', name: 'ASP.NET Core', icon: 'fas fa-server', color: '#512bd4', desc: 'REST APIs and controllers' },
  { id: 'threejs', name: 'Three.js', icon: 'fas fa-cube', color: '#2b1c15', desc: 'Realtime 3D graphics' },
];

const INNER_COUNT = 7;
const INNER_R = 118;
const OUTER_R = 218;

function Role() {
  const [hovered, setHovered] = useState(null);
  const stageRef = useRef(null);
  const nodeRefs = useRef([]);

  // Mutable animation state lives in refs so the loop never re-renders React.
  const target = useRef({ x: 0, y: 0, active: 0 });
  const mouse = useRef({ x: 0, y: 0, active: 0 });
  const clock = useRef({ angle: 0, speed: 1 });
  const hoverRef = useRef(null);

  const nodes = useMemo(
    () =>
      SKILLS.map((skill, i) => {
        const inner = i < INNER_COUNT;
        const count = inner ? INNER_COUNT : SKILLS.length - INNER_COUNT;
        const idx = inner ? i : i - INNER_COUNT;
        return {
          ...skill,
          radius: inner ? INNER_R : OUTER_R,
          base: (idx / count) * Math.PI * 2 - Math.PI / 2 + (inner ? 0 : 0.22),
          dir: inner ? 1 : -1,
          speed: inner ? 0.085 : 0.05,
          floatPhase: i * 1.37,
        };
      }),
    [],
  );

  useAnimationFrame((time, delta) => {
    const dt = Math.min(delta, 50) / 1000;
    const t = time / 1000;
    const m = mouse.current;
    const g = target.current;

    // critically-damped style easing, frame-rate independent
    const ease = 1 - Math.pow(0.0012, dt);
    m.x += (g.x - m.x) * ease;
    m.y += (g.y - m.y) * ease;
    m.active += (g.active - m.active) * ease;

    // slow the orbit down when a node is hovered, resume smoothly afterwards
    const wanted = hoverRef.current ? 0.12 : 1;
    clock.current.speed += (wanted - clock.current.speed) * (1 - Math.pow(0.004, dt));
    clock.current.angle += dt * clock.current.speed;

    nodes.forEach((n, i) => {
      const el = nodeRefs.current[i];
      if (!el) return;
      const a = n.base + n.dir * clock.current.angle * n.speed * Math.PI * 2;
      let x = Math.cos(a) * n.radius;
      let y = Math.sin(a) * n.radius;

      // gentle drift
      x += Math.sin(t * 0.7 + n.floatPhase) * 3;
      y += Math.cos(t * 0.6 + n.floatPhase) * 3;

      // magnetic push away from the pointer
      const dx = x - m.x;
      const dy = y - m.y;
      const dist = Math.hypot(dx, dy) || 1;
      const influence = Math.max(0, 1 - dist / 170) * m.active;
      const eased = influence * influence * (3 - 2 * influence);
      x += (dx / dist) * eased * 30;
      y += (dy / dist) * eased * 30;

      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    });
  });

  const handleMove = (e) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    // account for the mobile scale transform
    const scale = rect.width / stageRef.current.offsetWidth || 1;
    target.current.x = (e.clientX - rect.left - rect.width / 2) / scale;
    target.current.y = (e.clientY - rect.top - rect.height / 2) / scale;
    target.current.active = 1;
  };

  const handleLeave = () => {
    target.current.active = 0;
    hoverRef.current = null;
    setHovered(null);
  };

  const enter = (skill) => {
    hoverRef.current = skill.id;
    setHovered(skill);
  };
  const leave = () => {
    hoverRef.current = null;
    setHovered(null);
  };

  return (
    <section className="role-section" id="role-section" aria-labelledby="skills-heading">
      <div className="role-container">
        <h2 className="skills-title" id="skills-heading">Skills</h2>

        <div
          className="skills-circle-stage"
          ref={stageRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <span className="orbit-ring orbit-ring-inner" style={{ width: INNER_R * 2, height: INNER_R * 2 }} aria-hidden="true" />
          <span className="orbit-ring orbit-ring-outer" style={{ width: OUTER_R * 2, height: OUTER_R * 2 }} aria-hidden="true" />

          <div className="constellation-center" aria-hidden="true">
            <span className="center-halo" />
            <LogoMark className="center-mark" />
          </div>

          <ul className="constellation-nodes">
            {nodes.map((skill, i) => (
              <li
                key={skill.id}
                className={`skill-node ${hovered?.id === skill.id ? 'hovered' : ''}`}
                ref={(el) => (nodeRefs.current[i] = el)}
                onMouseEnter={() => enter(skill)}
                onMouseLeave={leave}
              >
                <span className="skill-icon-bubble" style={{ '--node-color': skill.color }}>
                  <i className={skill.icon} aria-hidden="true" />
                  <span className="sr-only">{skill.name}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="constellation-hud" aria-live="polite">
            <AnimatePresence mode="wait">
              {hovered && (
                <motion.div
                  key={hovered.id}
                  className="hud-tooltip"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <strong className="tooltip-name">{hovered.name}</strong>
                  <span className="tooltip-desc">{hovered.desc}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Role;
