import Container from '../layout/Container';
import useActiveCardIndex from '../../hooks/useActiveCardIndex';
import './HealthcareReality.css';

const CheckmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="bullet-icon">
    <rect width="24" height="24" rx="12" fill="var(--color-primary-teal)" fillOpacity="0.1"/>
    <path d="M16 8L10.5 14L8 11" stroke="var(--color-primary-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const cards = [
  {
    id: 'prior-auth',
    eyebrow: "Care Coordination",
    title: "Prior Authorization",
    description: "Clinical teams often spend valuable time coordinating payer requirements, collecting documentation and tracking authorization status across disconnected systems.",
    bullets: [
      "Manual data collection across disconnected EMRs and payer portals",
      "Delayed treatment timelines due to opaque authorization rules",
      "High administrative burden reducing clinical capacity"
    ],
    linkText: "Explore Authorization Intelligence",
    image: "image07 (1).png"
  },
  {
    id: 'clinical-doc',
    eyebrow: "Clinical Operations",
    title: "Clinical Documentation",
    description: "Clinical information is generated continuously, but transforming conversations into structured documentation remains a time-consuming operational task.",
    bullets: [
      "Physician burnout from after-hours chart completion",
      "Inconsistent structured data extraction from clinical conversations",
      "Delayed billing cycles due to incomplete or inaccurate notes"
    ],
    linkText: "Explore Documentation Intelligence",
    image: "image08 (1).png"
  },
  {
    id: 'revenue-cycle',
    eyebrow: "Financial Operations",
    title: "Revenue Cycle Management",
    description: "Billing, coding, claims and finance teams operate across multiple systems, creating fragmented workflows and limited visibility.",
    bullets: [
      "Siloed communication between clinical coding and finance teams",
      "Missed revenue opportunities due to coding inaccuracies",
      "Lack of end-to-end operational visibility across the claim lifecycle"
    ],
    linkText: "Explore Revenue Intelligence",
    image: "image09 (1).png"
  },
  {
    id: 'claims-eligibility',
    eyebrow: "Payer Operations",
    title: "Claims & Eligibility",
    description: "Claims validation, eligibility checks and payer requirements often require repetitive manual coordination between multiple enterprise systems.",
    bullets: [
      "Repetitive manual checks across multiple external payer portals",
      "High denial rates due to preventable eligibility data errors",
      "Time-consuming claim rework, validation and appeals processes"
    ],
    linkText: "Explore Claims Intelligence",
    image: "image10 (1).png"
  }
];

const HealthcareReality = () => {
  const { activeIndex, setRef } = useActiveCardIndex(cards.length);

  return (
    <section id="reality" className="reality-section">
      <Container>
        <div className="reality-header fade-up">
          <div className="reality-eyebrow">
            The Reality of Modern Healthcare Operations
          </div>
          <h2 className="reality-title">
            Healthcare Operations Are More Connected Than Ever.<br/>
            Yet More Fragmented Than Ever.
          </h2>
        </div>

        <div className="reality-cards-wrapper deck-wrap">
          <div className="reality-stage deck-stage">
            {cards.map((card, i) => {
              const state = i === activeIndex ? 'is-active' : i < activeIndex ? 'is-past' : '';
              return (
                <div
                  key={i}
                  className={`reality-card sticky-card deck-card ${state}`}
                  style={{ '--i': i }}
                >
                  <div className="card-content">
                    <div className="card-left">
                      <span className="card-eyebrow">{card.eyebrow}</span>
                      <h3 className="card-title-gradient">{card.title}</h3>
                      <p className="card-description">{card.description}</p>

                      <ul className="card-bullets">
                        {card.bullets.map((bullet, idx) => (
                          <li key={idx}>
                            <CheckmarkIcon />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <a href="#" className="card-link">
                        {card.linkText} <span className="arrow">→</span>
                      </a>
                    </div>
                    <div className="card-right">
                      <div className="illustration-canvas">
                        <div className="canvas-glow"></div>
                        <img src={`/${card.image}`} alt={card.title} className="card-illustration-image" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="reality-track deck-track" aria-hidden="true">
            {cards.map((_, i) => (
              <span key={i} className="deck-sentinel" ref={setRef(i)} />
            ))}
          </div>
        </div>

        <div className="reality-footer fade-up">
          <h3 className="reality-insight">
            Healthcare has invested in software.<br/>
            What it still lacks is operational coordination.
          </h3>
        </div>
      </Container>
    </section>
  );
};

export default HealthcareReality;
