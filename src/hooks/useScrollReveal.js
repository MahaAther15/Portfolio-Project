import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to trigger scroll reveal animations from left and right side.
 * When the section enters viewport (`threshold: 0.2`), it sets `isVisible` to true.
 * When scrolled away (`entry.isIntersecting === false`), it resets to false so the animation re-triggers cleanly every scroll.
 */
export function useScrollReveal(threshold = 0.2) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
            observer.disconnect();
        };
    }, [threshold]);

    return [ref, isVisible];
}
