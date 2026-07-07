import React, { useState, useEffect, useRef } from 'react';
import './WorkflowDiagram.css';

const nodes = [
  { id: 1, label: 'EMR', type: 'data' },
  { id: 2, label: 'Clinical Notes', type: 'data' },
  { id: 3, label: 'Insurance Rules', type: 'rule' },
  { id: 4, label: 'Medical Necessity Validation', type: 'ai' },
  { id: 5, label: 'Authorization Package', type: 'ai' },
  { id: 6, label: 'Physician Review', type: 'human' },
  { id: 7, label: 'Submission', type: 'action' },
  { id: 8, label: 'Status Monitoring', type: 'action' }
];

const NodeRingSVG = () => (
  <svg className="node-ring-svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="nodeRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary-teal)" />
        <stop offset="100%" stopColor="var(--color-primary-blue)" />
      </linearGradient>
    </defs>
    {/* Outer broken ring */}
    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#nodeRingGrad)" strokeWidth="1.5" strokeDasharray="160 120" strokeLinecap="round" transform="rotate(-60 50 50)" className="ring-spin-slow" />
    {/* Inner broken ring */}
    <circle cx="50" cy="50" r="39" fill="none" stroke="url(#nodeRingGrad)" strokeWidth="1.2" strokeDasharray="100 140" strokeLinecap="round" transform="rotate(130 50 50)" className="ring-spin-fast" />
  </svg>
);

const WorkflowDiagram = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = (e) => {
    if (!isMobile) return;
    const maxScroll = e.target.scrollWidth - e.target.clientWidth;
    if (maxScroll <= 0) return;
    const progress = e.target.scrollLeft / maxScroll; // 0 to 1
    setScrollProgress(progress * (nodes.length - 1)); // 0 to 7
  };

  // Shared gradient definition so it works on both mobile and desktop
  const GradientDefs = () => (
    <defs>
      <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(36, 124, 168, 0.1)" />
        <stop offset="50%" stopColor="var(--color-primary-teal)" />
        <stop offset="100%" stopColor="rgba(36, 124, 168, 0.1)" />
      </linearGradient>
    </defs>
  );

  return (
    <div className="workflow-arc-container fade-up">

      {/* Desktop Wrapper */}
      {!isMobile && (
        <div className="arc-wrapper">
          {/* Desktop SVG Arc Background */}
          <svg className="arc-svg" viewBox="0 0 1400 320" preserveAspectRatio="none">
            <GradientDefs />
            <path
              className="arc-path"
              d="M 50,250 Q 700,-100 1350,250"
              fill="none"
              stroke="url(#arc-gradient)"
              strokeWidth="3"
              strokeDasharray="1800"
              strokeDashoffset="1800"
              strokeLinecap="round"
            />
          </svg>

          {/* Desktop Nodes */}
          <div className="arc-nodes">
            {nodes.map((node, index) => {
              // Calculate position along the Quadratic Bezier curve
              // P0 = (50, 250), P1 = (700, -100), P2 = (1350, 250)
              const t = 1 - (index / (nodes.length - 1)); // 1 to 0 (right to left)

              const oneMinusT = 1 - t;
              const x = Math.pow(oneMinusT, 2) * 50 + 2 * oneMinusT * t * 700 + Math.pow(t, 2) * 1350;
              const y = Math.pow(oneMinusT, 2) * 250 + 2 * oneMinusT * t * -100 + Math.pow(t, 2) * 250;

              const leftPct = (x / 1400) * 100;
              const topPct = (y / 320) * 100;

              return (
                <div
                  key={node.id}
                  className={`arc-node delay-${index}`}
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  <div className="arc-node-content">
                    <NodeRingSVG />
                    <div className="arc-node-label">{node.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Title placed at the bottom for Desktop */}
          <h2 className="arc-title desktop-title">Workflow</h2>
        </div>
      )}

      {/* Mobile Wrapper */}
      {isMobile && (
        <div className="arc-mobile-wrapper">
          <div className="mobile-dial-container">
            <h2 className="arc-title mobile-title">Workflow</h2>

            {/* Mobile SVG Dial Circle */}
            <svg className="arc-svg-mobile" viewBox="0 60 400 235" preserveAspectRatio="xMidYMid meet">
              <GradientDefs />
              <circle cx="200" cy="350" r="230" fill="none" stroke="url(#arc-gradient)" strokeWidth="2" strokeDasharray="6,6" />
            </svg>

            <div className="mobile-dial-nodes">
              {nodes.map((node, index) => {
                // Workflow starts at EMR (index 7). 
                // We want EMR to be at angle 0 when scroll is 0.
                const nodePos = (nodes.length - 1) - index;
                const relativePos = nodePos - scrollProgress;

                // 1 unit of scroll = 35 degrees of rotation
                const angleDeg = relativePos * 35;
                const angleRad = angleDeg * (Math.PI / 180);

                const cx = 200; // Center X of the SVG viewBox
                const cy = 350; // Center Y of the SVG viewBox
                const r = 230;  // Radius

                // Calculate position on the circle
                const xPx = cx + r * Math.sin(angleRad);
                const yPx = cy - r * Math.cos(angleRad);

                // Opacity and scale based on distance from center
                const distance = Math.abs(relativePos);
                const opacity = distance > 2.5 ? 0 : 1 - (distance * 0.35);
                const scale = distance > 2.5 ? 0.5 : 1 - (distance * 0.15);

                return (
                  <div
                    key={node.id}
                    className="arc-node mobile-dial-node"
                    style={{
                      left: `${(xPx / 400) * 100}%`,
                      top: `${((yPx - 60) / 235) * 100}%`,
                      opacity: opacity,
                      transform: `translate(-50%, -50%) scale(${scale})`,
                      pointerEvents: opacity > 0.1 ? 'auto' : 'none',
                      zIndex: Math.round(10 - distance)
                    }}
                  >
                    <div className="arc-node-content">
                      <NodeRingSVG />
                      <div className="arc-node-label">{node.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Invisible Scroll Overlay for Touch Interaction */}
            <div
              className="mobile-scroll-overlay"
              ref={scrollRef}
              onScroll={handleScroll}
            >
              {/* 7 steps of scrolling, each 50vw wide */}
              <div style={{ width: 'calc(100vw + 350vw)', height: '100%' }}></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WorkflowDiagram;
