import { useEffect, useRef, useState } from 'react';
import Container from '../components/layout/Container';
import './ContactPage.css';

const ContactPage = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const illustrationRef = useRef(null);

  // Subtle radial glow following cursor on the right side
  const handleMouseMove = (e) => {
    if (!illustrationRef.current) return;
    const rect = illustrationRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="contact-page-wrapper">
      {/* Subtle Background Grid for Theme Consistency */}
      <div className="contact-bg-grid" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.015)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      {/* IMAGE_12: Decorative background layer */}
      <div className="contact-bg-layer" />

      <main className="contact-main">
        <Container className="contact-container">

          {/* Left Column: Editorial */}
          <div className="contact-left">
            <header className="contact-header fade-up">
              <span className="contact-eyebrow">LET'S START A CONVERSATION</span>
              <h1 className="contact-headline">
                Let's Build Smarter<br />Healthcare Operations.
              </h1>
              <p className="contact-lead">
                Whether you're exploring Agentic AI, modernizing healthcare workflows or looking to improve operational efficiency, we'd love to understand your goals and discuss how NeuronMind can help.
              </p>
            </header>

            <div className="contact-info-cards fade-up" style={{ animationDelay: '0.1s' }}>

              <div className="contact-info-card">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <span className="info-value">hello@neuronmind.ai</span>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">Serving Healthcare Organizations Across the United States</span>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Discovery Call</span>
                  <span className="info-value">Book a conversation with our team.</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Premium Form & Illustration */}
          <div
            className="contact-right fade-up"
            style={{ animationDelay: '0.2s' }}
            ref={illustrationRef}
            onMouseMove={handleMouseMove}
          >
            {/* IMAGE_11: Floating illustration */}
            <div className="contact-illustration-wrapper">
              <div
                className="contact-glow"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(24, 154, 119, 0.08) 0%, transparent 60%)`
                }}
              />
              <img
                src="/image11.png"
                alt="NeuronMind Solutions"
                className="contact-illustration floating"
              />
            </div>

            <div className="contact-form-container">
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" placeholder="Jane Doe" />
                </div>

                <div className="form-group">
                  <label htmlFor="workEmail">Work Email</label>
                  <input type="email" id="workEmail" placeholder="jane@hospital.org" />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company (Optional)</label>
                  <input type="text" id="company" placeholder="Organization Name" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="4" placeholder="How can we help?"></textarea>
                </div>

                <button type="submit" className="contact-submit-btn">
                  Schedule a Discovery Call
                </button>
                <p className="form-secondary-text">We'll typically respond within one business day.</p>
              </form>
            </div>
          </div>

        </Container>

        <div className="contact-editorial-footer fade-up" style={{ animationDelay: '0.4s' }}>
          <p>Every successful transformation starts with a conversation.</p>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
