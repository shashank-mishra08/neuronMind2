import { useEffect, useRef, useState } from 'react';
import Container from '../layout/Container';
import './Insights.css';

// --- DATA ---
const researchCards = [
  {
    category: 'Healthcare Operations',
    title: 'The Hidden Administrative Cost of Care',
    summary: 'Administrative workflows continue to consume valuable clinical time across providers, payers and operational teams. Modern healthcare organizations must rethink coordination—not simply digitize paperwork—to improve efficiency and patient outcomes.',
    readTime: '6 min read',
    illustration: (
      <div className="relative w-full h-full bg-slate-50/50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
        <div className="absolute w-64 h-64 border-[1px] border-[#189a77]/30 rounded-full blur-[1px]"></div>
        <div className="absolute w-40 h-40 border-[1px] border-[#247ca8]/30 rounded-full translate-x-12 blur-[1px]"></div>
        <div className="absolute w-80 h-32 bg-gradient-to-r from-transparent via-[#189a77]/10 to-transparent rotate-45"></div>
      </div>
    )
  },
  {
    category: 'Agentic AI',
    title: 'Beyond Automation: The Rise of Agentic Healthcare Operations',
    summary: 'Traditional automation follows predefined rules. Agentic AI understands operational context, reasons across workflows and coordinates complex healthcare processes with human oversight.',
    readTime: '8 min read',
    illustration: (
      <div className="relative w-full h-full bg-slate-50/50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
        <div className="absolute w-24 h-24 bg-white/80 shadow-xl backdrop-blur-md border border-white rounded-2xl z-10"></div>
        <div className="absolute w-20 h-20 bg-white/60 shadow-lg backdrop-blur-md border border-white rounded-2xl -translate-x-16 -translate-y-12"></div>
        <div className="absolute w-20 h-20 bg-white/60 shadow-lg backdrop-blur-md border border-white rounded-2xl translate-x-16 translate-y-12"></div>
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M30 40 L50 50 L70 60" stroke="#247ca8" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>
    )
  },
  {
    category: 'Enterprise Transformation',
    title: 'Is Your Organization Ready for Agentic AI?',
    summary: 'Enterprise AI success depends on governance, workflow maturity, integration strategy and operational readiness—not simply adopting new technology.',
    readTime: '7 min read',
    illustration: (
      <div className="relative w-full h-full bg-slate-50/50 rounded-2xl flex flex-col items-center justify-center overflow-hidden border border-slate-100 gap-4">
        <div className="w-3/4 h-8 bg-white shadow-sm border border-slate-100 rounded-md"></div>
        <div className="w-2/3 h-8 bg-white shadow-sm border border-slate-100 rounded-md"></div>
        <div className="w-1/2 h-8 bg-gradient-to-r from-[#189a77]/10 to-transparent border border-[#189a77]/20 rounded-md"></div>
      </div>
    )
  },
  {
    category: 'Revenue Cycle',
    title: 'The Future of Revenue Cycle Intelligence',
    summary: 'Revenue Cycle Management is evolving from disconnected administrative processes into intelligent operational ecosystems capable of continuous coordination and proactive decision support.',
    readTime: '10 min read',
    illustration: (
      <div className="relative w-full h-full bg-slate-50/50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#247ca8]/5 via-transparent to-transparent"></div>
        <div className="w-48 h-48 border-[0.5px] border-slate-300 rounded-full relative flex items-center justify-center">
           <div className="w-32 h-32 border-[0.5px] border-[#189a77]/40 rounded-full flex items-center justify-center">
             <div className="w-16 h-16 bg-white shadow-md rounded-full border border-slate-100"></div>
           </div>
        </div>
      </div>
    )
  },
  {
    category: 'Healthcare Strategy',
    title: 'Building Human-Centered AI',
    summary: 'The future of healthcare belongs to organizations that combine intelligent systems with experienced clinical teams. AI should augment expertise—not replace human judgment.',
    readTime: '5 min read',
    illustration: (
      <div className="relative w-full h-full bg-slate-50/50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
        <div className="w-32 h-40 bg-white shadow-lg border border-slate-100 rounded-tr-[40px] rounded-bl-[40px] z-10 translate-x-4"></div>
        <div className="w-32 h-40 bg-gradient-to-br from-[#189a77]/10 to-[#247ca8]/10 border border-slate-200 rounded-tl-[40px] rounded-br-[40px] -translate-x-4 mix-blend-multiply"></div>
      </div>
    )
  },
  {
    category: 'Future Outlook',
    title: 'The Healthcare Operating Model of the Next Decade',
    summary: 'Healthcare organizations are moving toward adaptive operational intelligence where existing enterprise systems coordinate seamlessly through autonomous yet governed AI agents.',
    readTime: '9 min read',
    illustration: (
      <div className="relative w-full h-full bg-slate-50/50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
        <div className="grid grid-cols-3 gap-4 p-8 w-full h-full opacity-60">
          {[...Array(9)].map((_, i) => (
             <div key={i} className={`rounded-xl border ${i === 4 ? 'bg-[#189a77]/10 border-[#189a77]/30' : 'bg-white border-slate-100 shadow-sm'}`}></div>
          ))}
        </div>
      </div>
    )
  }
];

const executiveBriefs = [
  'Why Denials Continue to Rise',
  'AI Governance Essentials',
  'Healthcare Interoperability',
  'Human Oversight in Agentic AI',
  'Workflow Intelligence',
  'Operational Coordination'
];

const glossaryTerms = [
  { term: 'What is Agentic AI?', def: 'A class of artificial intelligence that does not just generate text or respond to prompts, but actively reasons, makes decisions, and coordinates workflows across disparate enterprise systems to achieve complex operational goals.' },
  { term: 'What is Prior Authorization?', def: 'The process by which a healthcare provider obtains approval from a health insurance plan before delivering a specific service, medication, or procedure, often creating significant administrative bottlenecks.' },
  { term: 'What is Revenue Cycle Management?', def: 'The financial process that healthcare facilities use to track patient care episodes from registration and appointment scheduling to the final payment of a balance, encompassing all administrative and clinical functions.' },
  { term: 'What is Clinical Documentation?', def: 'The creation of a digital or analog record detailing a medical treatment, medical trial or clinical test, essential for ensuring accurate patient history, billing, and compliance.' },
  { term: 'What is Interoperability?', def: 'The ability of different information systems, devices and applications to access, exchange, integrate and cooperatively use data in a coordinated manner, within and across organizational boundaries.' },
  { term: 'What is AI Governance?', def: 'The framework of rules, practices, and processes that ensure artificial intelligence technologies are designed, developed, and deployed in a manner that is ethical, compliant, secure, and aligned with organizational goals.' },
];

const frameworkCards = [
  'Healthcare AI Readiness Assessment',
  'Prior Authorization Transformation Framework',
  'Revenue Cycle Modernization Playbook',
  'Clinical Documentation Strategy Guide',
  'Enterprise AI Governance Framework',
  'Operational Intelligence Roadmap'
];

const industrySignals = [
  'AI Governance',
  'Healthcare Interoperability',
  'Operational Intelligence',
  'Prior Authorization Reform',
  'Revenue Cycle Modernization',
  'Healthcare Workforce Transformation'
];

const exploringThemes = [
  'Multi-Agent Prior Authorization',
  'Ambient Clinical Documentation',
  'Intelligent Revenue Cycle Operations',
  'AI Governance for Enterprise Healthcare',
  'Voice-Driven Healthcare Workflows'
];

// --- COMPONENT ---
const Insights = () => {
  const sectionRef = useRef(null);
  const [openGlossary, setOpenGlossary] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => elements?.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#2c2e33] font-sans selection:bg-[#189a77]/20 selection:text-[#189a77]" ref={sectionRef}>
      
      {/* ─────────────────────────── HERO SECTION ─────────────────────────── */}
      <section className="relative insights-hero bg-white">
        <Container>
          <div className="insights-grid-2">
            
            {/* Left Column */}
            <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-1000 ease-out z-10">
              <span className="block text-xs font-semibold tracking-[0.2em] text-[#189a77] uppercase mb-8">
                Executive Insights
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-[#1a1c20] mb-8">
                Perspectives on the <br className="hidden lg:block"/>
                <span className="bg-gradient-to-r from-[#189a77] to-[#247ca8] bg-clip-text text-transparent">Future of Healthcare</span> <br className="hidden lg:block"/>
                Operations.
              </h1>
              <div className="text-lg md:text-xl text-[#4a4d55] font-light leading-relaxed max-w-xl space-y-4">
                <p>Healthcare is entering a new operational era.</p>
                <p>Agentic AI, intelligent workflow orchestration and enterprise transformation are redefining how providers, payers and healthcare organizations operate.</p>
                <p>These insights explore the ideas shaping that future.</p>
              </div>
            </div>

            {/* Right Column (Abstract Illustration) */}
            <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-1000 delay-200 ease-out flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-lg aspect-square">
                {/* Clean, editorial CSS illustration */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100/50 shadow-2xl shadow-slate-200/50 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#189a77]/5 rounded-full blur-3xl mix-blend-multiply"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#247ca8]/5 rounded-full blur-3xl mix-blend-multiply"></div>
                  
                  {/* Glass panels */}
                  <div className="relative w-64 h-40 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] rotate-[-12deg] translate-y-8 translate-x-8 z-10 animate-[float_8s_ease-in-out_infinite]"></div>
                  <div className="absolute w-64 h-40 bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.02)] rotate-[5deg] -translate-y-8 -translate-x-8 animate-[float_9s_ease-in-out_infinite_reverse]"></div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-20" viewBox="0 0 100 100">
                     <path d="M 20 80 Q 50 50 80 20" fill="none" stroke="#2c2e33" strokeWidth="0.2" className="animate-[dash_20s_linear_infinite]" strokeDasharray="2 2" />
                     <circle cx="20" cy="80" r="1" fill="#189a77" />
                     <circle cx="80" cy="20" r="1" fill="#247ca8" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ─────────────────────────── EDITORIAL QUOTE ─────────────────────────── */}
      <section className="insights-section bg-slate-50/30">
        <Container>
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-1000 ease-out max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-[#1a1c20]">
              "The next transformation in healthcare will not come from more software.<br className="hidden md:block"/>
              <span className="text-[#646873]">It will come from making existing systems work intelligently together.</span>"
            </h2>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────── MAIN CONTENT (RESEARCH CARDS) ─────────────────────────── */}
      <section className="insights-section">
        <Container>
          <div className="insights-space-y-32 md:insights-space-y-48">
            {researchCards.map((card, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`insights-grid-2 reveal-on-scroll opacity-0 translate-y-6 transition-all duration-1000 ease-out`}>
                  
                  {/* Illustration Side */}
                  <div className={`w-full aspect-[4/3] lg:aspect-square ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                     {card.illustration}
                  </div>

                  {/* Text Side */}
                  <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-[#4a4d55] text-xs font-semibold tracking-wider uppercase rounded-full mb-6">
                      {card.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-semibold text-[#1a1c20] leading-tight mb-6 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-lg md:text-xl text-[#4a4d55] font-light leading-relaxed mb-8">
                      {card.summary}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                      <span className="text-sm font-medium text-[#8a8f99] tracking-wide uppercase">
                        {card.readTime}
                      </span>
                      <a href="#read" className="group flex items-center text-sm font-semibold text-[#189a77] tracking-wide uppercase transition-colors hover:text-[#137a5f]">
                        Read Perspective
                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─────────────────────────── EXECUTIVE BRIEFS ─────────────────────────── */}
      <section className="insights-section bg-[#1a1c20] text-white">
        <Container>
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-1000 ease-out">
            <div className="flex flex-col md:flex-row md:items-end justify-between insights-mb-16">
              <div>
                <span className="block text-xs font-semibold tracking-[0.2em] text-[#189a77] uppercase insights-mb-4">Quick Reads</span>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Executive Briefs</h2>
              </div>
              <p className="text-slate-400 font-light mt-4 md:mt-0 text-sm tracking-wide">TWO-MINUTE READS</p>
            </div>
            
            <div className="insights-grid-3">
              {executiveBriefs.map((brief, index) => (
                <div key={index} className="group relative bg-[#24272c] border border-white/5 rounded-2xl p-8 hover:bg-[#2a2d33] transition-colors cursor-pointer">
                  <h3 className="text-xl font-medium leading-snug mb-8 group-hover:text-[#189a77] transition-colors">
                    {brief}
                  </h3>
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-[#189a77]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────── HEALTHCARE AI GLOSSARY ─────────────────────────── */}
      <section className="insights-section">
        <Container>
          <div className="max-w-3xl mx-auto reveal-on-scroll opacity-0 translate-y-6 transition-all duration-1000 ease-out">
            <div className="text-center insights-mb-16">
              <span className="block text-xs font-semibold tracking-[0.2em] text-[#247ca8] uppercase insights-mb-4">Definitions</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1a1c20]">Healthcare AI Glossary</h2>
            </div>
            
            <div className="border-t border-slate-200">
              {glossaryTerms.map((item, index) => {
                const isOpen = openGlossary === index;
                return (
                  <div key={index} className="border-b border-slate-200">
                    <button 
                      className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                      onClick={() => setOpenGlossary(isOpen ? null : index)}
                    >
                      <span className={`text-lg md:text-xl font-medium transition-colors ${isOpen ? 'text-[#189a77]' : 'text-[#1a1c20] group-hover:text-[#4a4d55]'}`}>
                        {item.term}
                      </span>
                      <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#189a77]' : 'text-[#8a8f99]'}`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-[#4a4d55] font-light leading-relaxed text-lg pr-8">
                        {item.def}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────── FRAMEWORKS ─────────────────────────── */}
      <section className="insights-section relative overflow-hidden bg-slate-50/50 z-0">
        {/* Subtle Background Orbs for Glass Effect */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#189a77]/10 rounded-full blur-[100px] -z-10 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#247ca8]/10 rounded-full blur-[80px] -z-10 mix-blend-multiply pointer-events-none"></div>

        <Container>
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-1000 ease-out relative z-10">
            <div className="text-center insights-mb-16">
              <span className="block text-xs font-semibold tracking-[0.2em] text-[#189a77] uppercase insights-mb-4">Executive Playbooks</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1a1c20]">Frameworks & Resources</h2>
            </div>
            
            <div className="insights-grid-3">
              {frameworkCards.map((framework, index) => (
                <div key={index} className="insights-liquid-glass cursor-pointer group insights-card-inner">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center insights-mb-6 border border-slate-200/50 shadow-sm transition-colors duration-300">
                      <svg className="w-4 h-4 text-[#8a8f99] group-hover:text-[#189a77] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#1a1c20] leading-snug transition-colors duration-300">
                      {framework}
                    </h3>
                  </div>
                  <div className="insights-mt-8 flex items-center justify-between border-t border-slate-200/50 pt-4 mt-auto">
                    <span className="text-sm font-semibold tracking-wide text-[#8a8f99] uppercase transition-colors duration-300 group-hover:text-[#1a1c20]">
                      Explore Framework
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/80 border border-slate-200/80 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-[#189a77] group-hover:border-[#189a77] group-hover:shadow-[0_0_20px_rgba(24,154,119,0.4)] group-hover:w-12 group-hover:h-12 overflow-hidden relative">
                      <svg className="w-4 h-4 text-[#8a8f99] transition-all duration-500 ease-out group-hover:-translate-y-8 group-hover:translate-x-8 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7L7 17M8 7h9v9" />
                      </svg>
                      <svg className="w-4 h-4 text-white transition-all duration-500 ease-out translate-y-8 -translate-x-8 group-hover:translate-y-0 group-hover:translate-x-0 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7L7 17M8 7h9v9" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────── INDUSTRY SIGNALS & WHAT WE'RE EXPLORING ─────────────────────────── */}
      <section className="insights-section">
        <Container>
          <div className="insights-grid-2 reveal-on-scroll opacity-0 translate-y-6 transition-all duration-1000 ease-out">
            
            {/* Industry Signals */}
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#1a1c20] pb-4 insights-mb-8 border-b border-slate-100">
                Industry Signals
              </h3>
              <ul className="insights-space-y-4">
                {industrySignals.map((signal, index) => (
                  <li key={index} className="insights-flex-bullet text-lg text-[#4a4d55] font-light">
                    <span className="insights-bullet-icon bg-[#189a77]"></span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>

            {/* What We're Exploring */}
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#1a1c20] pb-4 insights-mb-8 border-b border-slate-100">
                What We’re Exploring at NeuronMind
              </h3>
              <ul className="insights-space-y-4">
                {exploringThemes.map((theme, index) => (
                  <li key={index} className="insights-flex-bullet text-lg text-[#4a4d55] font-light">
                    <span className="insights-bullet-icon bg-[#247ca8]"></span>
                    {theme}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </Container>
      </section>

      {/* ─────────────────────────── ENDING STATEMENT ─────────────────────────── */}
      <section className="insights-ending">
        {/* Subtle mesh/radial background */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-30">
           <div className="w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(24,154,119,0.05)_0%,_transparent_70%)]"></div>
        </div>

        <Container>
          <div className="reveal-on-scroll opacity-0 translate-y-6 transition-all duration-1000 ease-out max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-[#1a1c20]">
              Healthcare has already digitized information.<br className="hidden md:block"/>
              <span className="bg-gradient-to-r from-[#189a77] to-[#247ca8] bg-clip-text text-transparent mt-4 block">
                The next decade will be about orchestrating intelligence.
              </span>
            </h2>
          </div>
        </Container>
      </section>

      {/* Global styles for floating animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-15px) rotate(-10deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(15px) rotate(8deg); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}</style>
    </div>
  );
};

export default Insights;
