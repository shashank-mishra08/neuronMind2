import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* Smooth-step cubic Hermite interpolation */
function smoothLerp(progress, inMin, inMax, outMin, outMax) {
  if (progress <= inMin) return outMin;
  if (progress >= inMax) return outMax;
  let t = (progress - inMin) / (inMax - inMin);
  t = t * t * (3 - 2 * t);
  return outMin + t * (outMax - outMin);
}

/* ── Single Card – animates based on its OWN viewport position ── */
function CinematicCard({ card, index }) {
  const cardRef = useRef(null);

  // Track this card's position relative to the viewport
  // progress 0 = card's top is at bottom of viewport (just entering)
  // progress 1 = card's bottom is at top of viewport (just leaving)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.7', 'end 0.25'],
  });

  // ENTER:  0.0 → 0.3  (card coming into view)
  // ACTIVE: 0.3 → 0.6  (card fully visible, readable)
  // EXIT:   0.6 → 1.0  (card leaving view)

  const opacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.1)  return 0;
    if (p < 0.35) return smoothLerp(p, 0.1, 0.35, 0, 1);
    if (p < 0.55) return 1;
    if (p < 0.85) return smoothLerp(p, 0.55, 0.85, 1, 0);
    return 0;
  });

  const scale = useTransform(scrollYProgress, (p) => {
    if (p < 0.1)  return 0.92;
    if (p < 0.35) return smoothLerp(p, 0.1, 0.35, 0.92, 1);
    if (p < 0.55) return 1;
    if (p < 0.85) return smoothLerp(p, 0.55, 0.85, 1, 0.90);
    return 0.90;
  });

  const x = useTransform(scrollYProgress, (p) => {
    if (p < 0.1)  return -35;
    if (p < 0.35) return smoothLerp(p, 0.1, 0.35, -35, 0);
    return 0;
  });

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        scale,
        x,
        willChange: 'transform, opacity',
        transformOrigin: 'center center',
      }}
    >
      <div className={`case-card card-${card.type}`}>
        <div className="card-accent-bar">
          <span className="card-rotated-text">{card.label}</span>
        </div>
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
    </motion.div>
  );
}

/* ── Simple vertical stack – no tall track, no sticky ── */
export default function CinematicCardFlow({ cards }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem 0.5rem 3rem' }}>
      {cards.map((card, i) => (
        <CinematicCard key={i} card={card} index={i} />
      ))}
    </div>
  );
}
