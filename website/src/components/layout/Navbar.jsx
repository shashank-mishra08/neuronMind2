import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Container className="navbar-container">
        <Link to="/" className="navbar-logo">
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
      </Container>
    </header>
  );
};

export default Navbar;
