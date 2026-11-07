import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenisScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis;
    let animationFrame;

    const stop = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
      lenis?.destroy();
      lenis = undefined;
    };

    const init = () => {
      stop();
      if (reducedMotion.matches) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      // Synchronize with GSAP if available
      if (typeof window !== 'undefined' && window.gsap?.ScrollTrigger) {
        lenis.on('scroll', window.gsap.ScrollTrigger.update);
      }

      const animate = (time) => {
        lenis?.raf(time);
        animationFrame = window.requestAnimationFrame(animate);
      };
      animationFrame = window.requestAnimationFrame(animate);
    };

    reducedMotion.addEventListener('change', init);
    init();

    return () => {
      reducedMotion.removeEventListener('change', init);
      stop();
    };
  }, []);
}
