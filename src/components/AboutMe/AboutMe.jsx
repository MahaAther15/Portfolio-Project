import { useMemo } from 'react';
import './AboutMe.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import mahaProfileImg from '../../assets/maha_professional.png';

// 3 Project stats cards shown below the intro + avatar row
const PROJECT_CARDS = [
    { count: '11', title: 'Web Projects', icon: 'fas fa-globe' },
    { count: '3', title: 'Flutter Projects', icon: 'fas fa-mobile-screen-button' },
    { count: '2', title: 'C# Projects', icon: 'fas fa-laptop-code' },
];

// Floating badges placed around the avatar frame
const FLOATING_BADGES = [
    { icon: 'fas fa-code', style: { top: '6%', left: '-8%' }, delay: '0s' },
    { icon: 'fas fa-palette', style: { bottom: '12%', left: '-10%' }, delay: '0.4s' },
    { icon: 'fas fa-mobile-alt', style: { top: '10%', right: '-8%' }, delay: '0.8s' },
    { icon: 'fas fa-comment-dots', style: { bottom: '8%', right: '-10%' }, delay: '1.2s' },
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

function AboutMe() {
    const [sectionRef, isVisible] = useScrollReveal(0.2);
    const particles = useMemo(() => generateParticles(35), []);

    return (
        <section
            className={`about-section ${isVisible ? 'in-view' : ''}`}
            id="about"
            ref={sectionRef}
        >
            {/* Ambient background glow & rising bubble particles */}
            <div className="about-orb" />
            <div className="about-particles" aria-hidden="true">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="about-particle"
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

            <div className="about-container">
                {/* ---- Top Row: Left Text + Right Avatar ---- */}
                <div className="about-top-row">
                    {/* Left: Text content */}
                    <div className="about-text">
                        <span className="about-badge">
                            <i className="fas fa-user" /> About Me
                        </span>

                        <h2 className="about-heading">
                            Hello, I'm <span className="highlight">Maha Ather</span>
                        </h2>

                        <p className="about-description">
                            I'm a creative developer and designer who loves turning ideas
                            into clean, functional, and delightful digital experiences.
                            With a strong eye for detail and a passion for modern web
                            technologies, I focus on building interfaces that feel as
                            good as they look.
                        </p>
                    </div>

                    {/* Right: Avatar / image showcase */}
                    <div className="about-visual">
                        <div className="about-blob" />

                        <div className="about-image-frame">
                            <div className="about-image-ring" />
                            <div className="about-avatar">
                                {/* Paste your image URL into the src attribute below when you are ready! */}
                                <img
                                    src={mahaProfileImg}
                                    alt="Maha Ather"
                                    className="about-profile-img"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        const fallback = e.currentTarget.nextElementSibling;
                                        if (fallback) fallback.style.display = 'flex';
                                    }}
                                    onLoad={(e) => {
                                        const fallback = e.currentTarget.nextElementSibling;
                                        if (fallback) fallback.style.display = 'none';
                                    }}
                                />
                                <div className="about-avatar-fallback">
                                    <i className="fas fa-user" />
                                </div>
                            </div>
                        </div>

                        {/* Floating skill badges around the avatar */}
                        {FLOATING_BADGES.map((badge, index) => (
                            <div
                                className="about-floating-badge"
                                key={index}
                                style={{ ...badge.style, animationDelay: badge.delay }}
                            >
                                <i className={badge.icon} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---- Bottom Row: 3 Project Cards (`btn-primary` inspired style) ---- */}
                <div className="about-cards-grid">
                    {PROJECT_CARDS.map((card, index) => (
                        <div
                            className="about-project-card"
                            key={card.title}
                        >
                            <div className="about-card-left">
                                <div className="about-card-icon">
                                    <i className={card.icon} />
                                </div>
                                <div className="about-card-info">
                                    <h3 className="about-card-count">{card.count}</h3>
                                    <p className="about-card-title">{card.title}</p>
                                </div>
                            </div>
                            <div className="about-card-arrow">
                                <i className="fas fa-arrow-right" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
