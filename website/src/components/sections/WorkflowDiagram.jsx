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

const WorkflowDiagram = () => {
  return (
    <div className="workflow-radar-container fade-up">
      <div className="radar-wrapper">
        
        {/* Core Center Hub */}
        <div className="radar-center">
          <div className="radar-pulse"></div>
          <div className="radar-core">
            <h3>Workflow</h3>
            <span className="radar-subtitle">Orchestration</span>
          </div>
        </div>

        {/* Concentric Rings for depth */}
        <div className="radar-ring ring-inner"></div>
        <div className="radar-ring ring-middle"></div>
        <div className="radar-ring ring-outer"></div>

        {/* Orbiting Nodes */}
        <div className="radar-orbit">
          {nodes.map((node, index) => {
            // Calculate angle to distribute the 8 nodes evenly (45 degrees apart)
            const angle = (360 / nodes.length) * index;
            // Add a slight offset so node 1 starts at the top
            const finalAngle = angle - 90; 
            
            return (
              <div 
                key={node.id} 
                className={`radar-node-wrapper node-${node.type}`}
                style={{ '--angle': `${finalAngle}deg` }}
              >
                <div className="radar-node">
                  <span className="node-number">0{node.id}</span>
                  <span className="node-label">{node.label}</span>
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
