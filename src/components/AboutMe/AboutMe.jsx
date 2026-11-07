import { motion } from 'framer-motion';
import mahaPhoto from '../../assets/maha_professional.png';
import './AboutMe.css';

const HIGHLIGHTS = [
  { value: '15+', label: 'Projects shipped', desc: 'Web apps, Flutter apps and AI tools' },
  { value: '4', label: 'Main stacks', desc: 'React, Flutter, Python and C#' },
  { value: '100%', label: 'Hands-on', desc: 'From the first sketch to the final deploy' },
];

function AboutMe() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-container">
        <div className="about-top-grid">
          <motion.div
            className="about-narrative"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="section-title" id="about-title">About me</h2>

            <p className="about-lead">
              I&apos;m Maha, a software engineer who enjoys turning rough ideas into products that
              work well and look right. Most of my time goes into React on the web, Flutter on
              mobile, and Python for anything that needs a bit of intelligence.
            </p>

            <p className="about-body">
              I don&apos;t start from templates. I plan the structure first, keep state simple, and
              spend the extra hour on spacing and type, because that&apos;s where an interface starts
              to feel finished.
            </p>

            <div className="about-actions">
              <a href="#contact" className="about-cta-btn">Start a conversation</a>
              <a
                href="https://github.com/MahaAther15/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-ghost-link"
              >
                <i className="fab fa-github" aria-hidden="true" />
                <span>See my code on GitHub</span>
              </a>
            </div>
          </motion.div>

          <motion.figure
            className="about-portrait-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portrait-image-wrapper">
              <img
                src={mahaPhoto}
                alt="Maha Ather, software engineer"
                className="portrait-img"
                loading="lazy"
              />
            </div>
          </motion.figure>
        </div>

        <div className="about-metrics-row">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="about-metric-card">
              <div className="metric-inner">
                <strong className="metric-num">{item.value}</strong>
                <span className="metric-tit">{item.label}</span>
                <p className="metric-des">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
