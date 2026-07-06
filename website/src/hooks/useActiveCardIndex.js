import { useEffect, useRef, useState } from 'react';

/**
 * Tracks which card in a stack is currently "active" — the one whose sentinel
 * is nearest the viewport centre. Deterministic (nearest-centre on scroll), so
 * it can never get stuck on the last card the way an intersection-only observer
 * can when several sentinels report at once.
 *
 * Drives the mobile card-deck crossfade. Returns the active index and a
 * ref-callback factory to attach to each sentinel.
 */
export default function useActiveCardIndex(count) {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    let raf = 0;

    const pick = () => {
      raf = 0;
      const center = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < refs.current.length; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        // Skip hidden sentinels (display:none → zero-size rect on desktop)
        if (r.height === 0) continue;
        const elCenter = r.top + r.height / 2;
        const dist = Math.abs(elCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      setActiveIndex(best);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    pick(); // initial

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  const setRef = (i) => (el) => {
    refs.current[i] = el;
    if (el) el.dataset.cardIndex = i;
  };

  return { activeIndex, setRef };
}
