import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../layout/Container';
import useCountUp from '../../hooks/useCountUp';
import './TransformationStories.css';

/* ═══════════════════════════════════════════════════════════════
   DATA — Three representative enterprise healthcare scenarios
   ═══════════════════════════════════════════════════════════════ */

const caseStudies = [
  {
    id: 1,
    tab: 'Prior Authorization Intelligence',
    badge: {
      dots: 4,        // out of 5
      label: 'Enterprise Scale',
      systems: 12,
      departments: 7,
    },
    context: {
      narrative:
        'A regional multi-specialty healthcare provider managing more than 18,000 prior authorization requests every month faced increasing delays across imaging, specialty procedures and outpatient services. Clinical documentation was fragmented across multiple enterprise systems, payer requirements changed frequently, and administrative teams spent valuable time collecting supporting documentation before submission.',
      challenges: [
        'Manual collection of clinical notes from multiple systems',
        'Frequent payer-specific documentation requirements',
        'Limited visibility into authorization status',
        'Administrative teams spending over 28 hours each week coordinating approvals',
        'Increasing treatment delays caused by fragmented workflows',
      ],
    },
    intelligence:
      'NeuronMind introduced an Agentic AI orchestration layer that coordinated clinical documentation, payer requirements, medical necessity validation and authorization package preparation across existing enterprise systems. Instead of replacing current software, autonomous AI agents continuously gathered required documentation, validated policy requirements, prepared complete authorization packages and proactively monitored authorization status while clinicians remained in control of final decisions.',
    metrics: [
      { value: 68, suffix: '%', desc: 'Reduction in manual administrative coordination' },
      { value: 47, suffix: '%', desc: 'Faster authorization package preparation' },
      { value: 61, suffix: '%', desc: 'Improvement in documentation completeness' },
      { value: 39, suffix: '%', desc: 'Fewer payer follow-up requests' },
      { value: 32, suffix: ' hrs', desc: 'Saved per week across authorization teams', featured: true },
    ],
  },
  {
    id: 2,
    tab: 'Revenue Cycle Intelligence',
    badge: {
      dots: 5,
      label: 'Mission Critical',
      systems: 15,
      departments: 9,
    },
    context: {
      narrative:
        'A healthcare organization processing approximately 125,000 claims annually experienced growing complexity across coding, billing and reimbursement operations. Disconnected enterprise systems limited visibility throughout the revenue cycle, requiring billing specialists to manually coordinate information between multiple departments.',
      challenges: [
        'High claim denial rates due to documentation inconsistencies',
        'Manual coding validation across multiple payer systems',
        'Limited visibility across the complete claim lifecycle',
        'Delayed reimbursement cycles impacting cash flow',
        'Administrative staff performing repetitive claim reviews',
      ],
    },
    intelligence:
      'NeuronMind deployed intelligent operational agents capable of coordinating coding validation, documentation readiness, payer policy verification and claim preparation before submission. Existing billing infrastructure remained unchanged while the intelligence layer continuously orchestrated enterprise workflows behind the scenes.',
    metrics: [
      { value: 43, suffix: '%', desc: 'Reduction in claim denials' },
      { value: 58, suffix: '%', desc: 'Faster claim preparation' },
      { value: 71, suffix: '%', desc: 'Fewer manual validation tasks' },
      { value: 24, suffix: ' hrs', desc: 'Administrative hours saved each week' },
      { value: 26, suffix: '-day', desc: 'Reduction in average reimbursement cycle', featured: true },
    ],
  },
  {
    id: 3,
    tab: 'Clinical Documentation Intelligence',
    badge: {
      dots: 4,
      label: 'Enterprise Scale',
      systems: 10,
      departments: 6,
    },
    context: {
      narrative:
        'A provider network conducting over 4,500 patient encounters each week struggled to maintain consistent clinical documentation across multiple care locations. Physicians spent significant time documenting encounters after patient visits, increasing administrative burden and reducing available clinical time.',
      challenges: [
        'Documentation completed after patient consultations',
        'Inconsistent note quality across care locations',
        'Manual clinical summarization with limited templates',
        'Administrative burden contributing to physician fatigue',
        'Limited interoperability across documentation systems',
      ],
    },
    intelligence:
      'NeuronMind introduced autonomous documentation agents capable of organizing encounter information, preparing structured clinical summaries and coordinating documentation workflows prior to physician review. Healthcare professionals retained full authority over every clinical decision while repetitive documentation tasks were intelligently coordinated.',
    metrics: [
      { value: 54, suffix: '%', desc: 'Reduction in documentation time' },
      { value: 49, suffix: '%', desc: 'Faster physician review process' },
      { value: 66, suffix: '%', desc: 'Improvement in documentation consistency' },
      { value: 18, suffix: '', desc: 'Additional patient appointments supported weekly' },
      { value: 81, suffix: '%', desc: 'Reduction in repetitive admin documentation tasks', featured: true },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ── Single animated metric ── */
function AnimatedMetric({ value, suffix, desc, featured, inView }) {
  const count = useCountUp(value, inView, 1500);
  return (
    <div className={`ts-metric${featured ? ' ts-metric--featured' : ''}`}>
      <div className="ts-metric-value">
        {count}
        {suffix}
      </div>
      <p className="ts-metric-desc">{desc}</p>
    </div>
  );
}

/* ── Complexity Badge ── */
function ComplexityBadge({ badge }) {
  return (
    <div className="ts-badge">
      <div>
        <div className="ts-badge-title">Workflow Complexity</div>
        <div className="ts-badge-dots">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={`ts-badge-dot${n <= badge.dots ? ' filled' : ''}`} />
          ))}
        </div>
        <div className="ts-badge-label">{badge.label}</div>
      </div>
      <div className="ts-badge-meta">
        <div className="ts-badge-meta-item">
          <span className="ts-badge-meta-key">Systems Coordinated</span>
          <span className="ts-badge-meta-val">{badge.systems}</span>
        </div>
        <div className="ts-badge-meta-item">
          <span className="ts-badge-meta-key">Departments Involved</span>
          <span className="ts-badge-meta-val">{badge.departments}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Animated connector between cards ── */
function Connector({ triggerPulse }) {
  return (
    <div className="ts-connector" aria-hidden="true">
      <div className="ts-connector-line">
        <div className={`ts-connector-line-fill${triggerPulse ? ' active' : ''}`} />
      </div>
      <div className={`ts-connector-pulse${triggerPulse ? ' animate' : ''}`} />
    </div>
  );
}

/* ── Card reveal animation wrapper ── */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Icons ── */
const ContextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IntelligenceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const ImpactIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   CASE STUDY CONTENT — scroll-triggered progressive reveal
   ═══════════════════════════════════════════════════════════════ */
function CaseStudyContent({ study }) {
  /* Refs for scroll-triggered progressive reveal */
  const contextRef = useRef(null);
  const intelligenceRef = useRef(null);
  const impactRef = useRef(null);

  const contextInView = useInView(contextRef, { once: true, margin: '-80px' });
  const intelligenceInView = useInView(intelligenceRef, { once: true, margin: '-80px' });
  const impactInView = useInView(impactRef, { once: true, margin: '-80px' });

  /* Connector pulse timings — fire after the preceding card has appeared */
  const [pulse1, setPulse1] = useState(false);
  const [pulse2, setPulse2] = useState(false);

  useEffect(() => {
    if (contextInView) {
      const timer = setTimeout(() => setPulse1(true), 400);
      return () => clearTimeout(timer);
    }
  }, [contextInView]);

  useEffect(() => {
    if (intelligenceInView) {
      const timer = setTimeout(() => setPulse2(true), 400);
      return () => clearTimeout(timer);
    }
  }, [intelligenceInView]);

  /* Reset animations when study changes */
  useEffect(() => {
    setPulse1(false);
    setPulse2(false);
  }, [study.id]);

  return (
    <div className="ts-study">
      {/* Complexity Badge */}
      <ComplexityBadge badge={study.badge} />

      {/* ── Card 1: Operational Context ── */}
      <motion.div
        ref={contextRef}
        variants={cardVariants}
        initial="hidden"
        animate={contextInView ? 'visible' : 'hidden'}
      >
        <div className="ts-card ts-card--context">
          <div className="ts-card-label">
            <span className="ts-card-label-icon"><ContextIcon /></span>
            Operational Context
          </div>
          <p className="ts-context-narrative">{study.context.narrative}</p>
          <div className="ts-challenges-heading">Operational Challenges</div>
          <ul className="ts-challenges">
            {study.context.challenges.map((c, i) => (
              <li key={i}>
                <span className="ts-challenge-marker" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── Connector 1 ── */}
      <Connector triggerPulse={pulse1} />

      {/* ── Card 2: NeuronMind Intelligence Layer ── */}
      <motion.div
        ref={intelligenceRef}
        variants={cardVariants}
        initial="hidden"
        animate={intelligenceInView ? 'visible' : 'hidden'}
      >
        <div className="ts-card ts-card--intelligence">
          <div className="ts-card-label">
            <span className="ts-card-label-icon"><IntelligenceIcon /></span>
            NeuronMind Intelligence Layer
          </div>
          <p className="ts-intelligence-text">{study.intelligence}</p>
        </div>
      </motion.div>

      {/* ── Connector 2 ── */}
      <Connector triggerPulse={pulse2} />

      {/* ── Card 3: Business Impact ── */}
      <motion.div
        ref={impactRef}
        variants={cardVariants}
        initial="hidden"
        animate={impactInView ? 'visible' : 'hidden'}
      >
        <div className="ts-card ts-card--impact">
          <div className="ts-card-label">
            <span className="ts-card-label-icon"><ImpactIcon /></span>
            Business Impact
          </div>
          <div className="ts-metrics-grid">
            {study.metrics.map((m, i) => (
              <AnimatedMetric
                key={i}
                value={m.value}
                suffix={m.suffix}
                desc={m.desc}
                featured={m.featured}
                inView={impactInView}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const TransformationStories = () => {
  const [activeId, setActiveId] = useState(1);
  const activeStudy = caseStudies.find((s) => s.id === activeId);

  return (
    <section id="transformation-stories" className="ts-section">
      <Container>
        {/* ── Section Header ── */}
        <div className="ts-header fade-up">
          <span className="ts-eyebrow">Representative Enterprise Scenarios</span>
          <h2 className="ts-headline">
            Representative Healthcare<br />Transformation Scenarios
          </h2>
          <p className="ts-supporting-text">
            Illustrative examples demonstrating how Agentic AI can orchestrate complex healthcare
            workflows. These scenarios are representative and intended to showcase operational
            possibilities.
          </p>
        </div>

        {/* ── Case Study Tabs ── */}
        <div className="ts-tabs fade-up" style={{ animationDelay: '0.1s' }}>
          {caseStudies.map((study) => (
            <button
              key={study.id}
              className={`ts-tab${activeId === study.id ? ' active' : ''}`}
              onClick={() => setActiveId(study.id)}
            >
              <span className="ts-tab-number">0{study.id}</span>
              {study.tab}
            </button>
          ))}
        </div>

        {/* ── Active Case Study ── */}
        <CaseStudyContent key={activeId} study={activeStudy} />

        {/* ── Disclaimer ── */}
        <div className="ts-disclaimer fade-up">
          <p>
            These examples are representative scenarios created to demonstrate potential enterprise
            workflow transformations. Metrics are illustrative and based on industry benchmarks.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default TransformationStories;
