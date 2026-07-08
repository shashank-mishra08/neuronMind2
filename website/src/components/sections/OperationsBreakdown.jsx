import Container from '../layout/Container';
import useActiveCardIndex from '../../hooks/useActiveCardIndex';
import './OperationsBreakdown.css';

const cards = [
  {
    image: "/image_02.png",
    title: "Disconnected Systems",
    description: "Healthcare workflows span multiple enterprise platforms that rarely communicate naturally. Information moves between systems through people instead of intelligent coordination.",
  },
  {
    image: "/image3.png",
    title: "Manual Coordination",
    description: "Manual errors and fragmented data lead to a 15% revenue leakage and constant firefighting.",
  },
  {
    image: "/image_04.png",
    title: "Operational Delays",
    description: "Administrative workflows slow down when approvals, documentation, referrals and claims depend on multiple manual checkpoints across different teams.",
  },
  {
    image: "/image_05.png",
    title: "Limited Operational Visibility",
    description: "Leaders often understand individual departments but struggle to see the complete operational journey from beginning to completion.",
  },
];

const OperationsBreakdown = () => {
  const { activeIndex, setRef } = useActiveCardIndex(cards.length);

  return (
    <section id="operations-breakdown" className="breakdown-section">
      <Container>
        <div className="breakdown-layout">
          
          {/* Left Column: Sticky Narrative */}
          <div className="breakdown-narrative">
            <div className="narrative-sticky">
              <div className="breakdown-eyebrow fade-up">
                Understanding the Operational Bottleneck
              </div>
              <h2 className="breakdown-title fade-up" style={{ animationDelay: '0.1s' }}>
                Healthcare Doesn't Lack Software.<br />
                It Lacks Coordination.
              </h2>
              <p className="breakdown-lead fade-up" style={{ animationDelay: '0.2s' }}>
                Modern healthcare organizations have invested heavily in digital transformation — EMRs,
                revenue cycle platforms, claims systems, scheduling and documentation tools, insurance
                portals. Every department has software. Very few workflows operate together.
              </p>
              
              <div className="breakdown-insight fade-up" style={{ animationDelay: '0.3s' }}>
                <p className="breakdown-insight-text">
                  The challenge isn't technology.<br />
                  The challenge is making technology work together.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Cards */}
          <div className="breakdown-cards-container depth-wrap">
            <div className="breakdown-cards-stage depth-stage">
              {cards.map((card, i) => {
                const state = i === activeIndex ? 'is-active' : i < activeIndex ? 'is-past' : 'is-next';
                return (
                  <article
                    key={i}
                    className={`breakdown-card fade-up depth-card ${state}`}
                    style={{ '--card-index': i }}
                  >
                    <div className="card-watermark">0{i + 1}</div>
                    <div className="card-visual-wrapper">
                      <div className="card-visual-bg"></div>
                      <img
                        src={card.image}
                        alt=""
                        className="breakdown-illustration-img"
                        loading="lazy"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="breakdown-card-body">
                      <h3 className="breakdown-card-title">{card.title}</h3>
                      <p className="breakdown-card-desc">{card.description}</p>
                    </div>
                  </article>
                );
              })}

              <div className={`deck-scroll-hint ${activeIndex >= cards.length - 1 ? 'is-hidden' : ''}`} aria-hidden="true">
                <span className="deck-scroll-hint-label">Scroll</span>
                <span className="deck-scroll-hint-dot">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="depth-track" aria-hidden="true">
              {cards.map((_, i) => (
                <span key={i} className="depth-sentinel" ref={setRef(i)} />
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default OperationsBreakdown;
