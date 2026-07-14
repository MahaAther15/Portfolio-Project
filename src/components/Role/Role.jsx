import { useState, useEffect, useMemo } from 'react';
import './Role.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const ROLES = [
    { label: 'WEB Developer', icon: 'fas fa-code', color: '#f5576c' },
    { label: 'UI/UX Designer', icon: 'fas fa-pen-nib', color: '#f093fb' },
    { label: 'React Specialist', icon: 'fab fa-react', color: '#61dafb' },
    { label: 'Creative Coder', icon: 'fas fa-wand-magic-sparkles', color: '#a78bfa' },
    { label: 'App Developer', icon: 'fab fa-android', color: '#22c55e' },
    { label: 'Asp.net', icon: 'fas fa-server', color: '#fbbf24' }
];

const TECH_BADGES = [
    { icon: 'fab fa-html5', label: 'HTML5', color: '#e34c26' },
    { icon: 'fab fa-css3-alt', label: 'CSS3', color: '#264de4' },
    { icon: 'fab fa-js', label: 'JS', color: '#f0db4f' },
    { icon: 'fab fa-react', label: 'React', color: '#61dafb' },
    { icon: 'fab fa-git-alt', label: 'Git', color: '#f05032' },
    { icon: 'fab fa-figma', label: 'Figma', color: '#a259ff' },
];

function generateParticles(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        x: Math.random() * 100,
        duration: Math.random() * 18 + 12,
        delay: Math.random() * 15,
        opacity: Math.random() * 0.4 + 0.1,
    }));
}

function Role() {
    const [activeRole, setActiveRole] = useState(0);
    const [sectionRef, visible] = useScrollReveal(0.2);
    const particles = useMemo(() => generateParticles(35), []);

    // Typewriter effect for Name ('Maha Ather') inside laptop monitor
    const [typedName, setTypedName] = useState('');
    const fullName = 'Maha Ather';

    useEffect(() => {
        let currentIndex = 0;
        let isDeleting = false;
        const interval = setInterval(() => {
            if (!isDeleting) {
                if (currentIndex <= fullName.length) {
                    setTypedName(fullName.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    // Pause for 3.5 seconds once fully typed before re-typing
                    isDeleting = true;
                }
            } else {
                if (currentIndex >= 0) {
                    setTypedName(fullName.slice(0, currentIndex));
                    currentIndex--;
                } else {
                    isDeleting = false;
                    currentIndex = 0;
                }
            }
        }, 130);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const id = setInterval(
            () => setActiveRole((p) => (p + 1) % ROLES.length),
            2800
        );
        return () => clearInterval(id);
    }, []);

    return (
        <section className="role-section" id="role-section" ref={sectionRef}>

            {/* shared particles — same animation as Hero, seamless */}
            <div className="role-particles" aria-hidden="true">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="role-particle"
                        style={{
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            left: `${p.x}%`,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                            opacity: p.opacity,
                        }}
                    />
                ))}
            </div>

            <div className={`role-inner ${visible ? 'role-visible' : ''}`}>

                {/* ──────── LEFT ──────── */}
                <div className="role-left">

                    <div className="role-label role-a1">
                        <i className="fas fa-circle-dot" /> What I Do
                    </div>

                    <h2 className="role-heading role-a2">
                        I'm a{' '}
                        <span
                            className="role-highlight"
                            key={activeRole}          /* remount → restart animation */
                            style={{ '--rc': ROLES[activeRole].color }}
                        >
                            <i className={`${ROLES[activeRole].icon} role-icon-spin`} />
                            {ROLES[activeRole].label}
                        </span>
                    </h2>

                    <p className="role-desc role-a3">
                        Building fast, pixel-perfect interfaces with modern tools.
                        I bridge great design and clean code — turning ideas into
                        immersive digital experiences.
                    </p>

                    {/* Role selector pills */}
                    <div className="role-pills role-a4">
                        {ROLES.map((r, i) => (
                            <button
                                key={r.label}
                                className={`role-pill ${activeRole === i ? 'active' : ''}`}
                                style={{ '--pc': r.color }}
                                onClick={() => setActiveRole(i)}
                            >
                                <i className={r.icon} /> {r.label}
                            </button>
                        ))}
                    </div>

                    {/* Tech badges */}
                    <div className="role-tech role-a5">
                        <span className="role-tech-lbl">Tech Stack</span>
                        <div className="role-badges">
                            {TECH_BADGES.map((b) => (
                                <div key={b.label} className="role-badge" style={{ '--bc': b.color }}>
                                    <i className={b.icon} />{b.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ──────── RIGHT — CSS illustration ──────── */}
                <div className="role-right role-a6" aria-hidden="true">

                    {/* Monitor frame */}
                    <div className="mon-wrap">
                        <div className="mon-frame">
                            <div className="mon-screen">

                                {/* Top browser bar */}
                                <div className="mon-bar">
                                    <span className="dot r" /><span className="dot a" /><span className="dot g" />
                                    <span className="mon-url">portfolio.dev</span>
                                </div>

                                {/* Code lines inside screen */}
                                <div className="mon-code">
                                    <div className="mc-line" style={{ '--d': '0s' }}>
                                        <span className="mc-kw">const</span>
                                        <span className="mc-var"> dev</span>
                                        <span className="mc-op"> =</span>
                                        <span className="mc-str"> &#123;</span>
                                    </div>
                                    <div className="mc-line" style={{ '--d': '.15s' }}>
                                        <span className="mc-ind" />
                                        <span className="mc-key">name</span>
                                        <span className="mc-op">:</span>
                                        <span className="mc-str"> '{typedName}'</span>
                                        <span className="mc-cursor" />
                                        <span className="mc-op">,</span>
                                    </div>
                                    <div className="mc-line" style={{ '--d': '.3s' }}>
                                        <span className="mc-ind" />
                                        <span className="mc-key">role</span>
                                        <span className="mc-op">:</span>
                                        <span className="mc-str"> '{ROLES[activeRole].label}'</span>
                                        <span className="mc-op">,</span>
                                    </div>
                                    <div className="mc-line" style={{ '--d': '.45s' }}>
                                        <span className="mc-ind" />
                                        <span className="mc-key">skills</span>
                                        <span className="mc-op">:</span>
                                        <span className="mc-bracket"> [</span>
                                    </div>
                                    <div className="mc-line" style={{ '--d': '.6s' }}>
                                        <span className="mc-ind2" />
                                        <span className="mc-str">'React', 'CSS', 'JS'</span>
                                        <span className="mc-op">,</span>
                                    </div>
                                    <div className="mc-line" style={{ '--d': '.75s' }}>
                                        <span className="mc-ind" />
                                        <span className="mc-bracket">]</span>
                                        <span className="mc-op">,</span>
                                    </div>
                                    <div className="mc-line" style={{ '--d': '.9s' }}>
                                        <span className="mc-ind" />
                                        <span className="mc-key">passion</span>
                                        <span className="mc-op">:</span>
                                        <span className="mc-bool"> true</span>
                                        <span className="mc-op">,</span>
                                    </div>
                                    <div className="mc-line" style={{ '--d': '1.05s' }}>
                                        <span className="mc-str">&#125;</span>
                                    </div>
                                </div>
                            </div>
                            {/* Monitor stand */}
                            <div className="mon-neck" />
                            <div className="mon-base" />
                        </div>

                        {/* ── Floating elements around the monitor ── */}

                        {/* Gear big */}
                        <div className="fl-el fl-gear1">
                            <i className="fas fa-gear" />
                        </div>
                        {/* Gear small */}
                        <div className="fl-el fl-gear2">
                            <i className="fas fa-gear" />
                        </div>
                        {/* Code bracket */}
                        <div className="fl-el fl-bracket">
                            <span>&lt;/&gt;</span>
                        </div>
                        {/* Star */}
                        <div className="fl-el fl-star">
                            <i className="fas fa-star" />
                        </div>
                        {/* Sparkle */}
                        <div className="fl-el fl-spark">
                            <i className="fas fa-wand-magic-sparkles" />
                        </div>
                        {/* React atom */}
                        <div className="fl-el fl-atom">
                            <i className="fab fa-react" />
                        </div>

                        {/* Glow chips (badges floating) */}
                        <div className="fl-chip fc-top">
                            <i className="fas fa-bolt" /> Fast
                        </div>
                        <div className="fl-chip fc-right">
                            <i className="fas fa-palette" /> Design
                        </div>
                        <div className="fl-chip fc-bot">
                            <i className="fab fa-react role-icon-spin" /> React
                        </div>

                        {/* Progress arc (bottom right corner) */}
                        <div className="mon-arcs">
                            {[
                                { label: 'Frontend', pct: 94, color: '#f5576c' },
                                { label: 'Design', pct: 82, color: '#f093fb' },
                                { label: 'React', pct: 90, color: '#61dafb' },
                            ].map((r) => (
                                <div key={r.label} className="arc-item">
                                    <svg viewBox="0 0 44 44">
                                        <circle cx="22" cy="22" r="18" className="arc-bg" />
                                        <circle
                                            cx="22" cy="22" r="18"
                                            className="arc-fg"
                                            style={{
                                                stroke: r.color,
                                                strokeDashoffset: `${113 - (113 * r.pct) / 100}`,
                                            }}
                                        />
                                    </svg>
                                    <span className="arc-pct" style={{ color: r.color }}>{r.pct}%</span>
                                    <span className="arc-lbl">{r.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Role;
