import { useState } from 'react';
import Container from '../layout/Container';
import './Industries.css';

const caseStudiesData = [
  {
    id: 1,
    title: "Prior Authorization Intelligence",
    description: "A multi-specialty healthcare provider was experiencing delays in prior authorization for advanced imaging and specialty procedures. Clinical documentation was spread across multiple systems, payer requirements changed frequently, and staff spent significant time gathering information before submission.",
    cards: [
      {
        type: "problem",
        label: "Problem",
        icon: "?",
        title: "The Challenge",
        bullets: [
          "Manual collection of clinical notes from EMR",
          "Frequent payer-specific documentation requirements",
          "Multiple follow-ups between providers and insurance teams",
          "Limited visibility into authorization status",
          "Administrative workload impacting care coordination"
        ]
      },
      {
        type: "solution",
        label: "Solution",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 14C10 14 10.5 10 12 10C13.5 10 14 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        title: "NeuronMind Approach",
        content: "NeuronMind introduced an intelligent workflow orchestration layer that coordinated patient history, clinical documentation, payer requirements, and medical necessity validation before preparing the authorization package. Human reviewers remained in control of final clinical decisions while repetitive coordination tasks were automated."
      },
      {
        type: "results",
        label: "Results",
        icon: (
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
        ),
        title: "Operational Outcome",
        bullets: [
          "Faster preparation of authorization packages",
          "Reduced manual coordination between teams",
          "Improved visibility across authorization stages",
          "Better consistency in documentation quality",
          "Administrative teams focused on exception handling instead of repetitive work"
        ]
      }
    ],
    workflowImage: "/workflow-diagram-placeholder.png"
  },
  {
    id: 2,
    title: "Case Study 2",
    description: "Coming soon.",
    cards: [
      {
        type: "problem",
        label: "Problem",
        icon: "?",
        title: "The Challenge",
        bullets: []
      },
      {
        type: "solution",
        label: "Solution",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 14C10 14 10.5 10 12 10C13.5 10 14 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        title: "NeuronMind Approach",
        content: ""
      },
      {
        type: "results",
        label: "Results",
        icon: (
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
        ),
        title: "Operational Outcome",
        bullets: []
      }
    ],
    workflowImage: ""
  },
  {
    id: 3,
    title: "Case Study 3",
    description: "Coming soon.",
    cards: [
      {
        type: "problem",
        label: "Problem",
        icon: "?",
        title: "The Challenge",
        bullets: []
      },
      {
        type: "solution",
        label: "Solution",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 14C10 14 10.5 10 12 10C13.5 10 14 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        title: "NeuronMind Approach",
        content: ""
      },
      {
        type: "results",
        label: "Results",
        icon: (
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
        ),
        title: "Operational Outcome",
        bullets: []
      }
    ],
    workflowImage: ""
  }
];

const Industries = () => {
  const [activeTab, setActiveTab] = useState(1);
  const activeStudy = caseStudiesData.find(study => study.id === activeTab);

  return (
    <section id="case-studies" className="case-studies-section">
      <Container>

        {/* Tabs */}
        <div className="case-tabs-container fade-up">
          <div className="case-tabs">
            {[1, 2, 3].map(num => (
              <button
                key={num}
                className={`case-tab ${activeTab === num ? 'active' : ''}`}
                onClick={() => setActiveTab(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Content Header */}
        <div className="case-header fade-up">
          <h2 className="case-title">{activeStudy.title}</h2>
          <p className="case-description">{activeStudy.description}</p>
        </div>

        {/* Staggered Cards Flow */}
        {activeStudy.cards.length > 0 && (
          <div className="case-flow-container">
            {activeStudy.cards.map((card, index) => (
              <div
                key={index}
                className={`case-card-wrapper fade-up ${index % 2 === 0 ? 'align-left' : 'align-right'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >

                {/* CSS Border Connectors (hidden on last item) */}
                {index < activeStudy.cards.length - 1 && (
                  <div className={`css-connector css-connector-${index % 2 === 0 ? 'right' : 'left'}`}>
                    <div className="arrow-head"></div>
                  </div>
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
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </Container>
    </section>
  );
};

export default Industries;
