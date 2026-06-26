import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer" aria-label="Site Footer">
      <div className="container">
        <div className="footer-top">
          {/* Logo & Description */}
          <div>
            <a href="#" className="footer-brand-name">
              DATA<span>FLUX</span>
            </a>
            <p className="footer-brand-desc">
              Next-generation data routing, schema safety, and pipeline orchestration for production infrastructure.
            </p>
          </div>

          {/* Links Column 1: Product */}
          <div>
            <h3 className="footer-col-title">Product</h3>
            <ul className="footer-links">
              <li><a href="#features">Engine Spec</a></li>
              <li><a href="#pipeline">3D visualizer</a></li>
              <li><a href="#pricing">Price Tiers</a></li>
              <li><a href="#">CLI Reference</a></li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div>
            <h3 className="footer-col-title">Resources</h3>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Status</a></li>
              <li><a href="#">Security Policy</a></li>
              <li><a href="#">GitHub Repo</a></li>
            </ul>
          </div>

          {/* Links Column 3: Company */}
          <div>
            <h3 className="footer-col-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Kit</a></li>
              <li><a href="#">Contact Ops</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} DataFlux Inc. All rights reserved. Run with precision.
          </div>
          <div className="footer-social" aria-label="Social links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="DataFlux GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="DataFlux Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
