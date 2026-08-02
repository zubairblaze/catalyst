'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * App Router template re-mounts on every navigation, so this gives each page a
 * smooth enter transition (fade + subtle rise) without any extra wiring.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
