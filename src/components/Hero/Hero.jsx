import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const HeroScene = lazy(() => import('./HeroScene'));

const SOCIAL_LINKS = [
  { href: 'https://github.com/MahaAther15/', label: 'GitHub', icon: 'fab fa-github' },
  { href: 'https://www.linkedin.com/in/maha-ather22', label: 'LinkedIn', icon: 'fab fa-linkedin-in' },
];

function Hero() {
  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero-role">Software engineer</p>

          <h1 className="hero-title" id="hero-title">
            I build web apps, mobile apps and AI tools that people actually use.
          </h1>

          <p className="hero-lead">
            React and Flutter on the front, Python and C# behind them. I care about fast,
            well-structured code and interfaces that feel considered down to the last detail.
          </p>

          <ul className="hero-socials" aria-label="Profiles">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <i className={social.icon} aria-hidden="true" />
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="hero-visual"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
