import Container from '../layout/Container';
import './TrustStrip.css';

const badges = [
  "HIPAA Ready Architecture",
  "Enterprise Integration",
  "Human-in-the-Loop AI",
  "Workflow Intelligence",
  "Healthcare Operations"
];

const TrustStrip = () => {
  return (
    <div className="trust-strip">
      <Container>
        <div className="trust-badges-container fade-up" style={{ animationDelay: '0.4s' }}>
          {badges.map((badge, idx) => (
            <div key={idx} className="trust-badge">
              <span className="trust-badge-dot"></span>
              {badge}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TrustStrip;
