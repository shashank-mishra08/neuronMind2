import { useState, useEffect } from 'react';
import Container from '../layout/Container';
import WorkflowDiagram from './WorkflowDiagram';
import CinematicCardFlow from './CinematicCardFlow';
import useCountUp from '../../hooks/useCountUp';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Industries.css';

const AnimatedMetric = ({ value, suffix, desc, featured }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(value, inView, 1500);

  return (
    <div ref={ref} className={`case-metric ${featured ? 'featured' : ''}`}>
      <div className="metric-value">
        {count}{suffix}
      </div>
      <p className="metric-desc">{desc}</p>
    </div>
  );
};

const ComplexityBadge = ({ level, label, systems, teams }) => (
  <div className="workflow-complexity-badge">
    <div className="badge-header">
      <span className="badge-title">Workflow Complexity</span>
      <div className="badge-dots">
        {[1, 2, 3, 4, 5].map(n => (
          <span key={n} className={`badge-dot ${n <= level ? 'filled' : ''}`} />
        ))}
      </div>
      <span className="badge-scale">{label}</span>
    </div>
    <div className="badge-stats">
      <div className="badge-stat">
        <span className="stat-label">Systems Coordinated</span>
        <span className="stat-value">{systems}</span>
      </div>
      <div className="badge-stat">
        <span className="stat-label">Departments Involved</span>
        <span className="stat-value">{teams}</span>
      </div>
    </div>
  </div>
);

const caseStudiesData = [
  {
    id: 1,
    title: "Prior Authorization Intelligence",
    badge: { level: 4, label: 'Enterprise Scale', systems: 12, teams: 7 },
    cards: [
      {
        type: "problem",
        label: "Operational Context",
        icon: "?",
        title: "Operational Context",
        content: "A regional multi-specialty healthcare provider managing more than 18,000 prior authorization requests every month faced increasing delays across imaging, specialty procedures and outpatient services. Clinical documentation was fragmented across multiple enterprise systems, payer requirements changed frequently, and administrative teams spent valuable time collecting supporting documentation before submission.",
        bullets: [
          "Manual collection of clinical notes from multiple systems",
          "Frequent payer-specific documentation requirements",
          "Limited visibility into authorization status",
          "Administrative teams spending over 28 hours each week coordinating approvals",
          "Increasing treatment delays caused by fragmented workflows"
        ]
      },
      {
        type: "solution",
        label: "Intelligence Layer",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 14C10 14 10.5 10 12 10C13.5 10 14 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        title: "NeuronMind Intelligence Layer",
        content: "NeuronMind introduced an Agentic AI orchestration layer that coordinated clinical documentation, payer requirements, medical necessity validation and authorization package preparation across existing enterprise systems. Instead of replacing current software, autonomous AI agents continuously gathered required documentation, validated policy requirements, prepared complete authorization packages and proactively monitored authorization status while clinicians remained in control of final decisions."
      },
      {
        type: "results",
        label: "Business Impact",
        icon: (
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
        ),
        title: "Business Impact",
        metrics: [
          { value: 68, suffix: '%', desc: 'Reduction in manual administrative coordination' },
          { value: 47, suffix: '%', desc: 'Faster authorization package preparation' },
          { value: 61, suffix: '%', desc: 'Improvement in documentation completeness' },
          { value: 39, suffix: '%', desc: 'Fewer payer follow-up requests' },
          { value: 32, suffix: ' hrs', desc: 'Saved per week across authorization teams', featured: true },
        ]
      }
    ],
  },
  {
    id: 2,
    title: "Revenue Cycle Intelligence",
    badge: { level: 5, label: 'Mission Critical', systems: 15, teams: 9 },
    cards: [
      {
        type: "problem",
        label: "Operational Context",
        icon: "?",
        title: "Operational Context",
        content: "A healthcare organization processing approximately 125,000 claims annually experienced growing complexity across coding, billing and reimbursement operations. Disconnected enterprise systems limited visibility throughout the revenue cycle, requiring billing specialists to manually coordinate information between multiple departments.",
        bullets: [
          "High claim denial rates due to documentation inconsistencies",
          "Manual coding validation",
          "Limited visibility across claim lifecycle",
          "Delayed reimbursement cycles",
          "Administrative staff performing repetitive claim reviews"
        ]
      },
      {
        type: "solution",
        label: "Intelligence Layer",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 14C10 14 10.5 10 12 10C13.5 10 14 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        title: "NeuronMind Intelligence Layer",
        content: "NeuronMind deployed intelligent operational agents capable of coordinating coding validation, documentation readiness, payer policy verification and claim preparation before submission. Existing billing infrastructure remained unchanged while the intelligence layer continuously orchestrated enterprise workflows behind the scenes."
      },
      {
        type: "results",
        label: "Business Impact",
        icon: (
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
        ),
        title: "Business Impact",
        metrics: [
          { value: 43, suffix: '%', desc: 'Reduction in claim denials' },
          { value: 58, suffix: '%', desc: 'Faster claim preparation' },
          { value: 71, suffix: '%', desc: 'Fewer manual validation tasks' },
          { value: 24, suffix: ' hrs', desc: 'Administrative hours saved each week' },
          { value: 26, suffix: ' days', desc: 'Reduction in average reimbursement cycle', featured: true },
        ]
      }
    ],
  },
  {
    id: 3,
    title: "Clinical Documentation Intelligence",
    badge: { level: 4, label: 'Enterprise Scale', systems: 10, teams: 6 },
    cards: [
      {
        type: "problem",
        label: "Operational Context",
        icon: "?",
        title: "Operational Context",
        content: "A provider network conducting over 4,500 patient encounters each week struggled to maintain consistent clinical documentation across multiple care locations. Physicians spent significant time documenting encounters after patient visits, increasing administrative burden and reducing available clinical time.",
        bullets: [
          "Documentation completed after patient consultations",
          "Inconsistent note quality",
          "Manual clinical summarization",
          "Administrative burden contributing to physician fatigue",
          "Limited interoperability across documentation systems"
        ]
      },
      {
        type: "solution",
        label: "Intelligence Layer",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 14C10 14 10.5 10 12 10C13.5 10 14 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        title: "NeuronMind Intelligence Layer",
        content: "NeuronMind introduced autonomous documentation agents capable of organizing encounter information, preparing structured clinical summaries and coordinating documentation workflows prior to physician review. Healthcare professionals retained full authority over every clinical decision while repetitive documentation tasks were intelligently coordinated."
      },
      {
        type: "results",
        label: "Business Impact",
        icon: (
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
        ),
        title: "Business Impact",
        metrics: [
          { value: 54, suffix: '%', desc: 'Reduction in documentation time' },
          { value: 49, suffix: '%', desc: 'Faster physician review process' },
          { value: 66, suffix: '%', desc: 'Improvement in documentation consistency' },
          { value: 18, suffix: '', desc: 'Additional patient appointments supported each week' },
          { value: 81, suffix: '%', desc: 'Reduction in repetitive admin documentation tasks', featured: true },
        ]
      }
    ],
  }
];

const Industries = () => {
  const [activeTab, setActiveTab] = useState(1);
  const activeStudy = caseStudiesData.find(study => study.id === activeTab);

  // Mobile detection for cinematic scroll
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section id="case-studies" className="case-studies-section">
      <Container>

        {/* Content Header */}
        <div className="case-header fade-up text-center">
          <span className="case-eyebrow">REPRESENTATIVE ENTERPRISE SCENARIOS</span>
          <h2 className="case-title">Representative Healthcare Transformation Scenarios</h2>
          <p className="case-description">
            Illustrative examples demonstrating how Agentic AI can orchestrate complex healthcare workflows. These scenarios are representative and intended to showcase operational possibilities.
          </p>
        </div>

        {/* Tabs */}
        <div className="case-tabs-container fade-up">
          <div className="case-tabs">
            {caseStudiesData.map(study => (
              <button
                key={study.id}
                className={`case-tab ${activeTab === study.id ? 'active' : ''}`}
                onClick={() => setActiveTab(study.id)}
              >
                0{study.id} — {study.title}
              </button>
            ))}
          </div>
        </div>

        {/* Staggered Cards Flow */}
        <div className="case-study-content fade-up" key={activeTab}>
          <ComplexityBadge {...activeStudy.badge} />
          
          {activeStudy.cards.length > 0 && (
            <>
              {/* Mobile: Cinematic scroll-linked animation */}
              {isMobile && (
                <CinematicCardFlow cards={activeStudy.cards} />
              )}

              {/* Desktop: Staggered zigzag layout with SVG connectors */}
              {!isMobile && (
                <div className="case-flow-container">
                  {activeStudy.cards.map((card, index) => (
                    <div
                      key={index}
                      className={`case-card-wrapper fade-up ${index % 2 === 0 ? 'align-left' : 'align-right'}`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >

                      {/* SVG Flow Connectors (hidden on last item) */}
                      {index < activeStudy.cards.length - 1 && (
                        <svg 
                          className={`svg-connector svg-connector-${index % 2 === 0 ? 'right' : 'left'}`} 
                          viewBox="0 0 200 90" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="none"
                        >
                          {index % 2 === 0 ? (
                            <>
                              <path className="connector-path" d="M0,0 H180 Q200,0 200,20 V80" />
                              <polygon className="connector-arrow" points="195,75 205,75 200,85" />
                            </>
                          ) : (
                            <>
                              <path className="connector-path" d="M200,0 H20 Q0,0 0,20 V80" />
                              <polygon className="connector-arrow" points="-5,75 5,75 0,85" />
                            </>
                          )}
                        </svg>
                      )}

                    <div className={`case-card card-${card.type}`}>
                      {/* Left Accent Bar with Rotated Text */}
                      <div className="card-accent-bar">
                        <span className="card-rotated-text">{card.label}</span>
                      </div>

                      {/* Card Content Area */}
                      <div className="case-card-content">
                        <div className="case-card-header">
                          <span className="case-card-icon">{card.icon}</span>
                          <h3 className="case-card-title">{card.title}</h3>
                        </div>

                        {card.content && (
                          <p className="case-card-text">{card.content}</p>
                        )}

                        {card.bullets && (
                          <ul className="case-card-bullets">
                            {card.bullets.map((bullet, bIdx) => (
                              <li key={bIdx}>
                                <span className="bullet-star">*</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}

                        {card.metrics && (
                          <div className="case-metrics-grid">
                            {card.metrics.map((m, i) => (
                              <AnimatedMetric key={i} {...m} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
              )}
            </>
          )}
        </div>
        
        <div className="case-disclaimer fade-up">
          <p>These examples are representative scenarios created to demonstrate potential enterprise workflow transformations.</p>
        </div>

      </Container>

      {/* Render Workflow Diagram only for Case Study 1 (Prior Authorization) */}
      {activeStudy.id === 1 && (
        <WorkflowDiagram />
      )}

      <div className="case-closing-footer fade-up">
        <Container>
          <p className="case-closing-statement">
            We don't simply deliver AI.<br/>
            <span className="statement-highlight">We engineer intelligent healthcare operations.</span>
          </p>
        </Container>
      </div>
    </section>
  );
};

export default Industries;
