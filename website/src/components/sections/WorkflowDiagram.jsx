import React from 'react';
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
  return (
    <div className="workflow-arc-container fade-up">
      <div className="arc-wrapper">
        <h2 className="arc-title">Workflow</h2>
        
        {/* SVG Arc Background */}
        <svg className="arc-svg" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path 
            className="arc-path" 
            d="M 50,450 A 450,450 0 0,1 950,450" 
            fill="none" 
            stroke="url(#arc-gradient)" 
            strokeWidth="3" 
            strokeDasharray="1414"
            strokeDashoffset="1414"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(36, 124, 168, 0.1)" />
              <stop offset="50%" stopColor="var(--color-primary-teal)" />
              <stop offset="100%" stopColor="rgba(36, 124, 168, 0.1)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nodes along the Arc */}
        <div className="arc-nodes">
          {nodes.map((node, index) => {
            const angleInDegrees = 180 - (index * (180 / (nodes.length - 1)));
            const angleInRadians = angleInDegrees * (Math.PI / 180);
            
            // Adjust radius to place nodes perfectly on/above the line
            const r = 450;
            const cx = 500;
            const cy = 450;
            
            const x = cx + r * Math.cos(angleInRadians);
            const y = cy - r * Math.sin(angleInRadians);
            
            const leftPct = (x / 1000) * 100;
            const topPct = (y / 500) * 100;

            return (
              <div 
                key={node.id}
                className={`arc-node delay-${index}`}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              >
                <div className="arc-node-content">
                  <NodeRingSVG />
                  <span className="arc-node-label">{node.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowDiagram;
