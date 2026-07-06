import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from './Container';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${menuOpen ? 'navbar-open' : ''}`}>
      <Container className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/neruoMindlogo.png" alt="NeuronMind" className="navbar-logo-img" />
          <span className="navbar-logo-text"><span className="logo-color-accent">Neuron</span>Mind</span>
        </Link>

        <nav className="navbar-links">
          <a href="/#solutions">Solutions</a>
          <a href="/#industries">Industries</a>
          <a href="/#insights">Insights</a>
          <a href="/#about">About</a>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="navbar-actions">
          <a href="/#platform" className="btn btn-secondary btn-sm">Explore Platform</a>
          <Link to="/contact" className="btn btn-primary btn-sm">Book Discovery Call</Link>
        </div>

        <button
          className={`navbar-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
        </button>
      </Container>

      {/* Mobile dropdown panel */}
      <div className={`navbar-mobile-panel ${menuOpen ? 'is-open' : ''}`}>
        <nav className="navbar-mobile-links">
          <a href="/#solutions" onClick={closeMenu}>Solutions</a>
          <a href="/#industries" onClick={closeMenu}>Industries</a>
          <a href="/#insights" onClick={closeMenu}>Insights</a>
          <a href="/#about" onClick={closeMenu}>About</a>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </nav>
        <div className="navbar-mobile-actions">
          <a href="/#platform" className="btn btn-secondary" onClick={closeMenu}>Explore Platform</a>
          <Link to="/contact" className="btn btn-primary" onClick={closeMenu}>Book Discovery Call</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
