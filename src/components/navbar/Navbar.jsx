import { useState, useEffect, useCallback } from 'react';
import Logo from '../Logo/Logo';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Skills', href: '#role-section' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    const handleOutsideClick = (event) => {
      if (!event.target.closest('header')) closeMenu();
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu]);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    closeMenu();
  };

  return (
    <header className={`portfolio-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <a className="portfolio-logo" href="#home" onClick={() => handleLinkClick('')} aria-label="Maha, back to top">
            <Logo className="logo-svg" />
          </a>
          <div className="nav-status-pill">
            <span className="status-indicator" aria-hidden="true" />
            <span>Available for work</span>
          </div>
        </div>

        <nav className={`nav-wrapper ${isMenuOpen ? 'menu-open' : ''}`} aria-label="Main navigation">
          <ul id="navMenu" className="nav-menu">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="nav-item">
                <a
                  href={link.href}
                  className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
                  aria-current={activeLink === link.href ? 'location' : undefined}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="nav-cta" onClick={() => handleLinkClick('#contact')}>
          Let&apos;s talk
        </a>

        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="navMenu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
