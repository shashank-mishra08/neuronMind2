import './HeroVisualization.css';

const leftNodes = [
  "Electronic Medical Records",
  "Clinical Documentation",
  "Claims",
  "Revenue Cycle"
];

const rightNodes = [
  "Insurance",
  "Scheduling",
  "Referral Management",
  "Patient Engagement"
];

const HeroVisualization = () => {
  return (
    <div className="hero-viz-container">
      <div className="hero-viz-orbit">
        {/* Left Peripheral Nodes */}
        <div className="hero-viz-col peripheral-col left-col">
          {leftNodes.map((node, i) => (
            <div key={`l-${i}`} className="viz-node peripheral-node">
              {node}
              <div className="connection-line right">
                <div className="particle" style={{ animationDelay: `${i * 0.7}s` }}></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Center Nodes */}
        <div className="hero-viz-col center-col">
          <div className="viz-node center-node breathing">
             <div className="node-glow"></div>
             <strong>NeuronMind</strong><br/>
             <span className="text-xs">Intelligence Layer</span>
          </div>
          
          <div className="vertical-connection">
             <div className="particle" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="viz-node output-node">
             Healthcare Team
          </div>
        </div>

        {/* Right Peripheral Nodes */}
        <div className="hero-viz-col peripheral-col right-col">
          {rightNodes.map((node, i) => (
            <div key={`r-${i}`} className="viz-node peripheral-node">
              <div className="connection-line left">
                <div className="particle" style={{ animationDelay: `${i * 0.5 + 0.3}s` }}></div>
              </div>
              {node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroVisualization;
