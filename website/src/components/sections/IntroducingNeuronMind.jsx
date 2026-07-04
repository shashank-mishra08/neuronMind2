import { useEffect, useState, useRef } from 'react';
import Container from '../layout/Container';
import './IntroducingNeuronMind.css';

const whyCards = [
  {
    id: 'healthcare-expertise',
    title: "Healthcare Expertise",
    description: "Purpose-built for the operational realities of U.S. healthcare, from prior authorization and revenue cycle management to clinical documentation and payer coordination.",
    image: "image_06.png"
  },
  {
    id: 'agentic-ai',
    title: "Agentic AI by Design",
    description: "Our solutions leverage autonomous AI agents that reason, coordinate and adapt across complex workflows instead of automating isolated tasks.",
    image: "image_06.png"
  },
  {
    id: 'enterprise-integration',
    title: "Enterprise Integration",
    description: "NeuronMind integrates with existing enterprise systems, preserving current technology investments while extending operational intelligence across the organization.",
    image: "image_06.png"
  },
  {
    id: 'human-centered',
    title: "Human-Centered Delivery",
    description: "Every solution is designed to augment healthcare teams, keeping clinicians and operational leaders in control while reducing administrative burden.",
    image: "image_06.png"
  }
];

const IntroducingNeuronMind = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when card is roughly in the middle
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveCardIndex(index);
        }
      });
    }, options);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="why-neuronmind" className="why-section">
      <Container className="why-container">
        
        <header className="why-header fade-up">
          <div className="why-eyebrow">WHY ORGANIZATIONS CHOOSE US</div>
          <h2 className="why-title">
            Built for Enterprise Healthcare.<br />
            Designed for Intelligent Operations.
          </h2>
          <p className="why-subtitle">
            NeuronMind combines deep healthcare operational understanding with Agentic AI engineering to deliver intelligent enterprise solutions that integrate seamlessly into existing healthcare ecosystems.
          </p>
        </header>

        <div className="why-cards-stack">
          {whyCards.map((card, index) => {
            // A card is "stacked" behind if it's before the active card
            const isStacked = index < activeCardIndex;
            const isActive = index === activeCardIndex;

            return (
              <div 
                key={card.id}
                ref={(el) => cardRefs.current[index] = el}
                data-index={index}
                className={`why-card-wrapper ${isStacked ? 'stacked' : ''} ${isActive ? 'active' : ''}`}
                style={{ 
                  top: `calc(15vh + ${index * 30}px)`, 
                  zIndex: index + 1 
                }}
              >
                <div className="why-card">
                  <div className="why-card-left">
                    <h3 className="why-card-title">
                      {card.title}
                      <span className="title-accent-line"></span>
                    </h3>
                    <div className="why-card-desc-wrapper">
                      <p className="why-card-description">{card.description}</p>
                    </div>
                  </div>
                  <div className="why-card-right">
                    <div className="why-illustration-canvas">
                      <div className="why-particles"></div>
                      <img 
                        src={`/${card.image}`} 
                        alt={card.title} 
                        className="why-illustration-image" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="why-footer fade-up">
          <p className="why-closing-statement">
            We don't simply deliver AI.<br/>
            We engineer intelligent healthcare operations.
          </p>
        </div>

      </Container>
    </section>
  );
};

export default IntroducingNeuronMind;
