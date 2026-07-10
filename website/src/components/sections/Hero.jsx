import Container from '../layout/Container';
import { Link } from 'react-router-dom';
import Insights3DBackground from '../3d/Insights3DBackground';
import './Hero.css';

const Hero = () => {
  return (
    <>
      <section id="hero" className="hero-section">
        <Insights3DBackground />
        <div className="hero-bg-pattern"></div>
        <Container className="relative z-10">
          <div className="hero-grid">
            <div className="hero-content fade-up">
              <div className="hero-eyebrow">
                Enterprise Agentic AI for US Healthcare
              </div>
              <h1 className="hero-headline">
                Build Intelligent Healthcare Operations, Not More Software.
              </h1>
              <p className="hero-description">
                NeuronMind helps healthcare organizations orchestrate Prior Authorization, Clinical Documentation, Revenue Cycle, Claims Processing and other administrative workflows through an intelligent operational layer powered by Agentic AI.
              </p>
              <div className="hero-cta-row">
                <Link to="/contact" className="btn btn-primary">Book Discovery Call</Link>
              </div>
            </div>
            
            <div className="hero-visual fade-left" style={{ animationDelay: '0.2s' }}>
              <img 
                src="/heroSection.jpeg" 
                alt="NeuronMind Healthcare Architecture" 
                className="hero-screenshot-img"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Hero;
