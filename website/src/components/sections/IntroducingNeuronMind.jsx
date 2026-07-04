import Container from '../layout/Container';
import './IntroducingNeuronMind.css';

const capabilities = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    ),
    title: "Enterprise Integration",
    description: "Connect existing healthcare systems without replacing the technology already in use."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    title: "Workflow Orchestration",
    description: "Coordinate complex healthcare operations across multiple departments and enterprise platforms."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    title: "Human-Centered Intelligence",
    description: "AI prepares and coordinates work while healthcare professionals retain complete control over final decisions."
  }
];

const IntroducingNeuronMind = () => {
  return (
    <section id="meet-neuronmind" className="nm-intro-section">
      {/* Subtle Background Art */}
      <div className="nm-intro-bg" aria-hidden="true">
        <svg className="nm-connection-lines" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.015)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Subtle curves */}
          <path d="M-100 200 C 300 100, 600 500, 1200 300" fill="none" stroke="var(--color-primary-teal)" strokeWidth="1" strokeOpacity="0.04" />
          <path d="M-100 600 C 400 800, 800 200, 1400 400" fill="none" stroke="var(--color-primary-blue)" strokeWidth="1" strokeOpacity="0.04" />
        </svg>
      </div>

      <Container>
        <div className="nm-intro-layout">
          
          {/* Left Column: Editorial Content */}
          <div className="nm-intro-content">
            <header className="nm-intro-header">
              <div className="nm-intro-eyebrow fade-up">Meet NeuronMind</div>
              <h2 className="nm-intro-headline fade-up" style={{ animationDelay: '0.1s' }}>
                Enterprise Intelligence for Modern Healthcare Operations.
              </h2>
              <p className="nm-intro-lead fade-up" style={{ animationDelay: '0.2s' }}>
                Healthcare organizations already rely on powerful enterprise platforms for clinical, financial and operational workflows. NeuronMind adds an intelligent coordination layer that connects these systems, understands workflow context and orchestrates complex administrative processes while keeping healthcare professionals in control of every critical decision.
              </p>
            </header>

            <div className="nm-capabilities-list">
              {capabilities.map((cap, i) => (
                <div 
                  key={cap.title} 
                  className="nm-capability-block fade-up" 
                  style={{ animationDelay: `${0.3 + (i * 0.1)}s` }}
                >
                  <div className="nm-capability-icon">
                    {cap.icon}
                  </div>
                  <div className="nm-capability-text">
                    <h3 className="nm-capability-title">{cap.title}</h3>
                    <p className="nm-capability-desc">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Large Illustration */}
          <div className="nm-intro-visual fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="nm-visual-container">
              <img 
                src="/image_06.png" 
                alt="NeuronMind operational layer architecture" 
                className="nm-hero-illustration"
                loading="lazy"
              />
            </div>
          </div>

        </div>

        {/* Bottom Transition */}
        <div className="nm-intro-footer fade-up" style={{ animationDelay: '0.6s' }}>
          <p className="nm-intro-statement">
            One connected operational layer.<br />
            Built around the way healthcare actually works.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default IntroducingNeuronMind;
