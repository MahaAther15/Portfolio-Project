import { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About Me', href: '#about' },
    { label: 'Portfolio Showcase', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');
    const [isScrolled, setIsScrolled] = useState(false);

    // Close menu on outside click
    const handleOutsideClick = useCallback((e) => {
        if (!e.target.closest('header') && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [handleOutsideClick]);

    // Track scroll for header shadow
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const handleLinkClick = (href) => {
        setActiveLink(href);
        setIsMenuOpen(false);
    };

    return (
        <header
            className={`portfolio-header ${isScrolled ? 'shadow-lg shadow-black/20' : ''}`}
        >
            {/* Logo */}
            <div className="portfolio-logo">
                Portfolio<span>.</span>
            </div>

            {/* Navigation */}
            <nav className="nav-wrapper">
                <ul
                    id="navMenu"
                    className={`nav-menu flex items-center justify-center gap-10 ${isMenuOpen ? 'open' : ''}`}
                >
                    {NAV_LINKS.map((link) => (
                        <li key={link.href} className="nav-item">
                            <a
                                href={link.href}
                                className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
                                onClick={() => handleLinkClick(link.href)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Right: CTA button */}
            <div className="nav-right">
                <a
                    href="#contact"
                    className="nav-link nav-cta"
                    onClick={() => handleLinkClick('#contact')}
                >
                    Let's Talk
                </a>
            </div>

            {/* Hamburger (mobile) */}
            <button
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
}

export default Navbar;