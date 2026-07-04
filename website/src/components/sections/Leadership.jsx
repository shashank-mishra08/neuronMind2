import { useEffect, useRef } from 'react';
import Container from '../layout/Container';
import './Leadership.css';

const Leadership = () => {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);

  // Very subtle cursor interaction over the portrait backdrop
  const handleMouseMove = (e) => {
    const el = visualRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  // Reveal content only when it scrolls into view
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = root.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="leadership" className="leadership-section" ref={sectionRef}>
      <Container>
        <div className="lead-grid">

          <div className="lead-text reveal">
            <span className="lead-eyebrow">Leadership</span>
            <h2 className="lead-headline">Anil Bajpai</h2>
            <p className="lead-role">Vice President, EXL</p>
            
            <ul className="lead-meta-list">
              <li>18+ Years Enterprise Transformation</li>
              <li>Enterprise Agentic AI</li>
              <li>US Healthcare Operations</li>
              <li>IISc Alumni</li>
            </ul>
          </div>

          <div
            className="lead-visual reveal"
            ref={visualRef}
            onMouseMove={handleMouseMove}
          >
            {/* Background aurora — soft depth, no icons or labels */}
            <div className="lead-aurora" aria-hidden="true">
              <span className="lead-blob lead-blob-1" />
              <span className="lead-blob lead-blob-2" />
              <span className="lead-blob lead-blob-3" />

              <svg className="lead-lines" viewBox="0 0 400 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path className="lead-line" d="M30,130 C140,60 260,190 372,110" />
                <path className="lead-line lead-line-delay" d="M28,370 C150,300 250,430 374,350" />
                <circle className="lead-line-node" cx="30" cy="130" r="3" />
                <circle className="lead-line-node" cx="372" cy="110" r="3" />
                <circle className="lead-line-node" cx="374" cy="350" r="3" />
              </svg>

              <span className="lead-particle lead-particle-1" />
              <span className="lead-particle lead-particle-2" />
              <span className="lead-particle lead-particle-3" />
              <span className="lead-particle lead-particle-4" />

              <span className="lead-cursor-glow" />
            </div>

              <img
                src="/anil%20bajpai%202.png"
                alt="Anil Bajpai, Vice President at EXL"
                className="lead-portrait"
                loading="lazy"
              />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Leadership;
