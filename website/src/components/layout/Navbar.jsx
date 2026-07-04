import { useState, useEffect } from 'react';
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
        <a href="#top" className="navbar-logo">
          <img src="/neruoMindlogo.png" alt="NeuronMind" className="navbar-logo-img" />
          <span className="navbar-logo-text">NeuronMind</span>
        </a>
        <nav className="navbar-links">
          <a href="#solutions">Solutions</a>
          <a href="#industries">Industries</a>
          <a href="#insights">Insights</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="navbar-actions">
          <a href="#platform" className="btn btn-secondary btn-sm">Explore Platform</a>
          <a href="#contact" className="btn btn-primary btn-sm">Book Discovery Call</a>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
