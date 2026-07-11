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
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll timer
  useEffect(() => {
    const int = setInterval(() => {
      setOffset(prev => prev + 1);
    }, 2200); // 1.5s pause + 0.7s animation
    return () => clearInterval(int);
  }, []);

  // Shared gradient definition
  const GradientDefs = () => (
    <defs>
      <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(36, 124, 168, 0.1)" />
        <stop offset="50%" stopColor="var(--color-primary-teal)" />
        <stop offset="100%" stopColor="rgba(36, 124, 168, 0.1)" />
      </linearGradient>
    </defs>
  );

  const N = nodes.length;
  // centerPos decreases so relativePos increases, creating Left -> Right movement
  const centerPos = (N - 1) / 2 - offset;

  const renderNodes = (isMobileView) => {
    return nodes.map((node, index) => {
      // Find the closest equivalent position for this node near the centerPos
      let pos = index;
      while (pos < centerPos - N / 2) pos += N;
      while (pos > centerPos + N / 2) pos -= N;
      
      // Calculate cycle for the React key to prevent backward CSS sliding on wrap
      const cycle = Math.floor((pos - index) / N);
      
      // relativePos ranges from -3.5 to +3.5
      const relativePos = pos - centerPos;
      
      // Common visual properties
      const distance = Math.abs(relativePos);
      const opacity = distance > 2.5 ? 0 : 1 - (distance * 0.35);
      let style = {};

      if (!isMobileView) {
        // Desktop Quadratic Bezier Mapping
        // Map relativePos (-3.5 to 3.5) to t (0 to 1)
        const t = (relativePos + (N - 1) / 2) / (N - 1);
        
        const oneMinusT = 1 - t;
        const x = Math.pow(oneMinusT, 2) * 50 + 2 * oneMinusT * t * 700 + Math.pow(t, 2) * 1350;
        const y = Math.pow(oneMinusT, 2) * 250 + 2 * oneMinusT * t * -100 + Math.pow(t, 2) * 250;
        
        const scale = distance > 2.5 ? 0.5 : 1.3 - (distance * 0.25);
        
        style = {
          left: `${(x / 1400) * 100}%`,
          top: `${(y / 320) * 100}%`,
          opacity: opacity,
          transform: `translate(-50%, -50%) scale(${scale})`,
          zIndex: Math.round(10 - distance),
          pointerEvents: opacity > 0.1 ? 'auto' : 'none'
        };
      } else {
        // Mobile Circular Dial Mapping
        const angleDeg = relativePos * 35; // 35 degrees per item
        const angleRad = angleDeg * (Math.PI / 180);
        
        const cx = 200;
        const cy = 350;
        const r = 230;
        
        const xPx = cx + r * Math.sin(angleRad);
        const yPx = cy - r * Math.cos(angleRad);
        
        const scale = distance > 2.5 ? 0.4 : 0.85 - (distance * 0.15);
        
        style = {
          left: `${(xPx / 400) * 100}%`,
          top: `${((yPx - 60) / 235) * 100}%`,
          opacity: opacity,
          transform: `translate(-50%, -50%) scale(${scale})`,
          zIndex: Math.round(10 - distance),
          pointerEvents: opacity > 0.1 ? 'auto' : 'none'
        };
      }

      return (
        <div
          key={`${node.id}-${cycle}`}
          className="arc-node auto-scroll-node"
          style={style}
        >
          <div className="arc-node-content">
            <NodeRingSVG />
            <div className="arc-node-label">{node.label}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="workflow-arc-container fade-up">
      {/* Desktop Wrapper */}
      {!isMobile && (
        <div className="arc-wrapper">
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
          <div className="arc-nodes">
            {renderNodes(false)}
          </div>
          <h2 className="arc-title desktop-title">Workflow</h2>
        </div>
      )}

      {/* Mobile Wrapper */}
      {isMobile && (
        <div className="arc-mobile-wrapper">
          <div className="mobile-dial-container">
            <h2 className="arc-title mobile-title">Workflow</h2>
            <svg className="arc-svg-mobile" viewBox="0 60 400 235" preserveAspectRatio="xMidYMid meet">
              <GradientDefs />
              <circle cx="200" cy="350" r="230" fill="none" stroke="url(#arc-gradient)" strokeWidth="2" strokeDasharray="6,6" />
            </svg>
            <div className="mobile-dial-nodes">
              {renderNodes(true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowDiagram;
