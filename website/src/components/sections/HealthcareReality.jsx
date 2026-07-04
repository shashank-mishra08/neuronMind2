import Container from '../layout/Container';
import './HealthcareReality.css';

const cards = [
  {
    title: "Prior Authorization",
    description: "Clinical teams often spend valuable time coordinating payer requirements, collecting documentation and tracking authorization status across disconnected systems. Administrative work grows while treatment timelines become more difficult to manage.",
    visualText: "EMR → Clinical Notes → Insurance Rules → Authorization Request → Human Review",
  },
  {
    title: "Clinical Documentation",
    description: "Clinical information is generated continuously, but transforming conversations into structured documentation remains a time-consuming operational task that impacts physicians and care teams.",
    visualText: "Conversation → Clinical Context → SOAP Draft → Physician Review → EMR",
  },
  {
    title: "Revenue Cycle Management",
    description: "Billing, coding, claims and finance teams operate across multiple systems, creating fragmented workflows and limited visibility throughout the revenue cycle.",
    visualText: "Encounter → Coding → Claims → Payment → Reporting",
  },
  {
    title: "Claims & Eligibility",
    description: "Claims validation, eligibility checks and payer requirements often require repetitive manual coordination between multiple enterprise systems.",
    visualText: "Patient → Eligibility → Claims Validation → Submission → Status Tracking",
  },
  {
    title: "Referral Management",
    description: "Managing referrals across providers, specialists and scheduling teams often depends on manual communication, making coordination difficult and reducing operational visibility.",
    visualText: "Referral → Eligibility → Specialist → Appointment → Completion",
  }
];

const HealthcareReality = () => {
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

        <div className="reality-cards-wrapper">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className="reality-card sticky-card" 
              style={{ top: `calc(15vh + ${i * 20}px)`, zIndex: i + 1 }}
            >
              <div className="card-content">
                <div className="card-left">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className="card-right">
                  <div className="mini-workflow">
                    {card.visualText.split(' → ').map((step, idx, arr) => (
                      <div key={idx} className="workflow-step-wrapper">
                        <div className="workflow-step">{step}</div>
                        {idx < arr.length - 1 && (
                          <div className="workflow-connector">
                            <div className="particle" style={{ animationDelay: `${idx * 0.4}s` }}></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
