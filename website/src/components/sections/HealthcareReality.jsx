import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const CardContent = ({ card }) => (
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
);

const MobileView = ({ cards, activeIndex, setRef }) => (
  <div className="reality-cards-wrapper deck-wrap block lg:hidden">
    <div className="reality-stage deck-stage">
      {cards.map((card, i) => {
        const state = i === activeIndex ? 'is-active' : i < activeIndex ? 'is-past' : '';
        return (
          <div
            key={i}
            className={`reality-card sticky-card deck-card ${state}`}
            style={{ '--i': i }}
          >
            <CardContent card={card} />
          </div>
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

    <div className="reality-track deck-track" aria-hidden="true">
      {cards.map((_, i) => (
        <span key={i} className="deck-sentinel" ref={setRef(i)} />
      ))}
    </div>
  </div>
);

const TunnelCard = ({ card, i, total, progress }) => {
  const c = i / (total - 1);
  const step = 1 / (total - 1);

  let inputs = [];
  let scaleOut = [];
  let opacityOut = [];
  let yOut = [];

  // Dramatic, Apple-like 3D tunnel math:
  // Card enters large (1.1) from below (15vh) with 0 opacity.
  // Lands at center (1.0, 0vh) with full opacity.
  // Shrinks into background (0.85) and moves up (-15vh) fading to 0.
  if (i === 0) {
    inputs = [0, step];
    scaleOut = [1, 0.85];
    opacityOut = [1, 0];
    yOut = ['0vh', '-15vh'];
  } else if (i === total - 1) {
    inputs = [c - step, 1];
    scaleOut = [1.1, 1];
    opacityOut = [0, 1];
    yOut = ['15vh', '0vh'];
  } else {
    inputs = [c - step, c, c + step];
    scaleOut = [1.1, 1, 0.85];
    opacityOut = [0, 1, 0];
    yOut = ['15vh', '0vh', '-15vh'];
  }

  // WAAPI bounds for hardware acceleration with strict clamping
  const scale = useTransform(progress, inputs, scaleOut, { clamp: true });
  const opacity = useTransform(progress, inputs, opacityOut, { clamp: true });
  const y = useTransform(progress, inputs, yOut, { clamp: true });
  const pointerEvents = useTransform(progress, (v) => Math.abs(v - c) < (step * 0.6) ? 'auto' : 'none');

  return (
    <motion.div
      className="absolute inset-0 w-full flex items-center justify-center pointer-events-none"
      style={{
        scale,
        opacity,
        y,
        zIndex: i + 1,
        transformOrigin: 'center center'
      }}
    >
      <div className="w-full max-w-[1100px] px-6 pointer-events-auto" style={{ pointerEvents }}>
        <div className="reality-card sticky-card w-full">
          <CardContent card={card} />
        </div>
      </div>
    </motion.div>
  );
};

const DesktopTunnel = ({ cards }) => {
  const containerRef = useRef(null);
  
  // 250vh provides a fast, snappy trackpad experience (less scrolling needed)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div className="h-[250vh] relative w-full mt-16" ref={containerRef}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {cards.map((card, i) => (
          <TunnelCard key={i} card={card} i={i} total={cards.length} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
};

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
      </Container>

      {/* Mobile View: Original Stacking Architecture */}
      <MobileView cards={cards} activeIndex={activeIndex} setRef={setRef} />

      {/* Desktop View: Advanced Z-Axis 3D Tunnel */}
      <div className="hidden lg:block w-full">
        <DesktopTunnel cards={cards} />
      </div>

      <Container>
        <div className="reality-footer fade-up mt-12">
          <h3 className="reality-insight">
            Healthcare has invested in software. What it still lacks is operational coordination.
          </h3>
        </div>
      </Container>
    </section>
  );
};

export default HealthcareReality;
