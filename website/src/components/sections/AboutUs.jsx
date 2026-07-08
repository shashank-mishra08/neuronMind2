import { useEffect, useRef } from 'react';

const philosophyCards = [
  {
    number: '01',
    title: 'Think Before Automating',
    description:
      'We begin by understanding healthcare operations before introducing technology. Our goal is to improve the way work flows, not simply automate isolated tasks.',
    image: '/about-card-think.png',
    alt: 'Abstract glass layers representing thoughtful analysis',
  },
  {
    number: '02',
    title: 'Human-Centered Intelligence',
    description:
      'Our AI is designed to support clinicians and operational teams while keeping people in control of every important decision.',
    image: '/about-card-human.png',
    alt: 'Abstract organic forms representing human oversight',
  },
  {
    number: '03',
    title: 'Enterprise by Design',
    description:
      'Every solution integrates with existing enterprise systems instead of replacing them, protecting technology investments while extending operational intelligence.',
    image: '/about-card-enterprise.png',
    alt: 'Abstract layered panels representing enterprise integration',
  },
];

const AboutUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const els = root.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const revealStyle = (delay = 0) => ({
    opacity: 0,
    transform: 'translateY(28px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section ref={sectionRef} id="about" className="relative overflow-clip">

      {/* ─── Subtle Background Pattern ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 10%, rgba(24,154,119,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 90%, rgba(36,124,168,0.03) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* ─────────────────────────── PART 1 : Editorial Opening ─────────────────────────── */}
      <div className="relative" style={{ padding: '10rem 0 6rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ gap: '4rem' }}
          /* 2-col on large screens */
          >
            <style>{`
              .about-opening-grid { display: grid; grid-template-columns: 1fr; align-items: center; }
              @media (min-width: 1024px) {
                .about-opening-grid { grid-template-columns: 1.2fr 0.8fr !important; }
              }
            `}</style>
            <div className="about-opening-grid" style={{ gap: '5rem' }}>

              {/* ── Left: Editorial Text ── */}
              <div data-reveal style={revealStyle(0)}>
                {/* Eyebrow */}
                <span
                  className="block"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: '#189a77',
                    marginBottom: '1.75rem',
                  }}
                >
                  About NeuronMind
                </span>

                {/* Headline */}
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 600,
                    lineHeight: 1.12,
                    letterSpacing: '-0.025em',
                    color: '#2c2e33',
                    marginBottom: '2rem',
                  }}
                >
                  Building the{' '}
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #189a77, #247ca8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Intelligence Layer
                  </span>
                  <br />
                  Behind Modern Healthcare.
                </h2>

                {/* Supporting paragraphs */}
                <div style={{ maxWidth: '520px' }}>
                  <p
                    style={{
                      fontSize: '1.0625rem',
                      lineHeight: 1.75,
                      color: '#4a4d55',
                      fontWeight: 300,
                      marginBottom: '1rem',
                    }}
                  >
                    NeuronMind is an enterprise AI consulting and implementation company focused on transforming healthcare operations through Agentic AI.
                  </p>
                  <p
                    style={{
                      fontSize: '1.0625rem',
                      lineHeight: 1.75,
                      color: '#4a4d55',
                      fontWeight: 300,
                      marginBottom: '1rem',
                    }}
                  >
                    We work with providers, payers, revenue cycle organizations and healthcare partners to redesign fragmented operational workflows into coordinated, intelligent systems.
                  </p>
                  <p
                    style={{
                      fontSize: '1.0625rem',
                      lineHeight: 1.75,
                      color: '#4a4d55',
                      fontWeight: 300,
                      marginBottom: 0,
                    }}
                  >
                    Rather than replacing existing technology investments, we extend them with an operational intelligence layer that enables better decisions, faster execution and scalable automation.
                  </p>
                </div>
              </div>

              {/* ── Right: Illustration ── */}
              <div data-reveal style={{ ...revealStyle(0.15), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="relative">
                  <img
                    src="/about-intelligence-layer.png"
                    alt="Abstract intelligence layer connecting healthcare operations"
                    className="block"
                    style={{
                      width: '100%',
                      maxWidth: '480px',
                      height: 'auto',
                      borderRadius: '20px',
                      animation: 'aboutFloat 7s ease-in-out infinite',
                      mixBlendMode: 'multiply',
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────── PART 2 : Philosophy Cards ─────────────────────────── */}
      <div className="relative" style={{ padding: '2rem 0 4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {philosophyCards.map((card, i) => (
              <div
                key={card.number}
                data-reveal
                style={{
                  ...revealStyle(0.08 * (i + 1)),
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '24px',
                  boxShadow: '0 12px 40px -12px rgba(44,46,51,0.08), 0 2px 6px rgba(44,46,51,0.03)',
                  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${0.08 * (i + 1)}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${0.08 * (i + 1)}s, box-shadow 0.35s ease, border-color 0.35s ease`,
                }}
                className="about-card-hover"
              >
                <style>{`
                  .about-card-hover:hover {
                    border-color: rgba(24,154,119,0.14) !important;
                    box-shadow: 0 12px 40px -8px rgba(44,46,51,0.1), 0 4px 12px -4px rgba(24,154,119,0.06) !important;
                  }
                  .about-card-hover:hover .about-card-img {
                    transform: scale(1.04);
                  }
                  .about-card-inner { display: grid; grid-template-columns: 1fr; align-items: center; }
                  @media (min-width: 768px) {
                    .about-card-inner { grid-template-columns: 1fr 280px !important; }
                  }
                  @media (min-width: 1024px) {
                    .about-card-inner { grid-template-columns: 1fr 340px !important; }
                  }
                `}</style>

                <div
                  className="about-card-inner"
                  style={{ gap: '2rem', padding: 'clamp(1.5rem, 3vw, 3rem)' }}
                >
                  {/* Card Text */}
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        color: '#8a8f99',
                        marginBottom: '1rem',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {card.number}
                    </span>
                    <h3
                      style={{
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                        fontWeight: 600,
                        color: '#2c2e33',
                        marginBottom: '0.875rem',
                        letterSpacing: '-0.015em',
                        lineHeight: 1.3,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        color: '#4a4d55',
                        fontWeight: 300,
                        maxWidth: '540px',
                        marginBottom: 0,
                      }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Card Illustration */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                      className="relative overflow-clip"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: '280px',
                        aspectRatio: '1',
                      }}
                    >
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="about-card-img relative"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          zIndex: 1,
                          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                          mixBlendMode: 'multiply',
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────── PART 3 : Closing Statement ─────────────────────────── */}
      <div className="relative" style={{ padding: '4rem 0 6rem' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>

          {/* Mesh background */}
          <div
            className="absolute pointer-events-none"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              top: '-10%',
              left: '-15%',
              right: '-15%',
              bottom: '-10%',
              zIndex: 0,
            }}
            aria-hidden="true"
          >
            <img
              src="/about-closing-mesh.png"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.14,
                filter: 'blur(3px)',
              }}
              loading="lazy"
            />
          </div>

          <div data-reveal style={revealStyle(0)} className="relative" >
            <h3
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                lineHeight: 1.3,
                color: '#2c2e33',
                marginBottom: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Healthcare doesn't need another platform.
              <br />
              It needs a <span style={{
                background: 'linear-gradient(90deg, #189a77, #247ca8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>smarter way</span> for existing systems to work together.
            </h3>
          </div>
        </div>
      </div>

      {/* ─── Keyframes & Reduced Motion ─── */}
      <style>{`
        @keyframes aboutFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
          img { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
