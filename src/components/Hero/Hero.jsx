import { useMemo } from 'react';
import './Hero.css';

// Social link configuration
const SOCIAL_LINKS = [
  { href: 'https://github.com/MahaAther15/', label: 'GitHub', icon: 'fab fa-github' },
  { href: 'www.linkedin.com/in/maha-ather22', label: 'LinkedIn', icon: 'fab fa-linkedin-in' },
  { href: '#', label: 'Dribbble', icon: 'fab fa-dribbble' },
];

// Generate particle data once (deterministic)
function generateParticles(count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 20,
      opacity: Math.random() * 0.5 + 0.1,
    });
  }
  return particles;
}

function Hero() {
  const particles = useMemo(() => generateParticles(50), []);

  return (
    <section className="hero-section" id="home">
      {/* Background Orbs */}
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />

      {/* Floating Particles */}
      <div className="particles-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
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

      {/* Main Content */}
      <div className="hero-content">
        {/* Badge */}
        {/* <div className="hero-badge">
          <i className="fas fa-code" /> 2026 · Creative Developer
        </div> */}

        {/* Heading */}
        <h1 className="hero-heading">
          <span className="highlight ">Portfolio Website</span>
        </h1>

        {/* Description */}
        <p className="hero-description">
          I'm a passionate designer &amp; developer crafting digital
          experiences that are fast, modern, and human-centered.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <a href="#portfolio" className="btn-secondary">
            <i className="fas fa-paper-plane mr-2" /> Explore My Work          </a>
        </div>

        {/* Social Links */}
        <div className="hero-social">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={social.icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      {/* <button
        className="scroll-indicator"
        onClick={handleScrollDown}
        aria-label="Scroll down"
      >
        <span>Scroll</span>
        <i className="fas fa-chevron-down" />
      </button> */}
    </section>
  );
}

export default Hero;
