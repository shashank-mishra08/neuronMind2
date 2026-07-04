import Container from './Container';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-brand">
            <h2>NeuronMind</h2>
            <p>Enterprise Workflow Intelligence for Healthcare.</p>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} NeuronMind. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
