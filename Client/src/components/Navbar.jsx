import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#" className="navbar-logo">
          DATA<span>FLUX</span>
        </a>

        <nav aria-label="Main Navigation">
          <ul className="navbar-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#pipeline">Pipeline</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </nav>

        <div className="navbar-desktop-cta">
          <a href="#pricing" className="btn btn-primary">
            Deploy Pipeline
          </a>
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
          <span style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none' }}></span>
        </button>
      </div>

      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
        <a href="#pipeline" onClick={() => setIsMobileMenuOpen(false)}>Pipeline</a>
        <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
        <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
        <div style={{ padding: '1rem 1.25rem' }}>
          <a href="#pricing" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>
            Deploy Pipeline
          </a>
        </div>
      </div>
    </header>
  );
}
