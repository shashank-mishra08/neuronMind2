import Container from '../layout/Container';
import useActiveCardIndex from '../../hooks/useActiveCardIndex';
import './IntroducingNeuronMind.css';

const whyCards = [
  {
    id: 'healthcare-expertise',
    title: "Healthcare Expertise",
    description: "Purpose-built for the operational realities of U.S. healthcare, from prior authorization and revenue cycle management to clinical documentation and payer coordination.",
    image: "image13.png"
  },
  {
    id: 'agentic-ai',
    title: "Agentic AI by Design",
    description: "Our solutions leverage autonomous AI agents that reason, coordinate and adapt across complex workflows instead of automating isolated tasks.",
    image: "image14.png"
  },
  {
    id: 'enterprise-integration',
    title: "Enterprise Integration",
    description: "NeuronMind integrates with existing enterprise systems, preserving current technology investments while extending operational intelligence across the organization.",
    image: "image15.png"
  },
  {
    id: 'human-centered',
    title: "Human-Centered Delivery",
    description: "Every solution is designed to augment healthcare teams, keeping clinicians and operational leaders in control while reducing administrative burden.",
    image: "image16.png"
  }
];

const IntroducingNeuronMind = () => {
  const { activeIndex, setRef } = useActiveCardIndex(whyCards.length);

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

        <div className="why-cards-stack deck-wrap">
          <div className="why-cards-stage deck-stage">
            {whyCards.map((card, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <div
                  key={card.id}
                  className={`why-card-wrapper deck-card ${isPast ? 'stacked is-past' : ''} ${isActive ? 'active is-active' : ''}`}
                  style={{ '--i': index }}
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

            <div className={`deck-scroll-hint ${activeIndex >= whyCards.length - 1 ? 'is-hidden' : ''}`} aria-hidden="true">
              <span className="deck-scroll-hint-label">Scroll</span>
              <span className="deck-scroll-hint-dot">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>

          <div className="why-track deck-track" aria-hidden="true">
            {whyCards.map((_, i) => (
              <span key={i} className="deck-sentinel" ref={setRef(i)} />
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
};

export default IntroducingNeuronMind;
