import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useCountUp — animates a number from 0 to `target` over `duration` ms.
 *
 * @param {number}  target    – The final value to count up to
 * @param {boolean} trigger   – Animation starts when this becomes true
 * @param {number}  [duration=1500] – Animation duration in ms
 * @returns {number} The current animated value (integer)
 */
export default function useCountUp(target, trigger, duration = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  // easeOutQuart — fast start, smooth deceleration
  const ease = useCallback((t) => {
    return 1 - Math.pow(1 - t, 4);
  }, []);

  useEffect(() => {
    if (!trigger) {
      setValue(0);
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = ease(progress);

      setValue(Math.round(easedProgress * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, trigger, duration, ease]);

  return value;
}
