import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return { ref, isInView };
}