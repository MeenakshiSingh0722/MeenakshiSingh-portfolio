'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full"
        style={{ background: 'linear-gradient(to right, hsl(35 28% 66%), hsl(38 40% 78%), hsl(35 45% 55%))' }}
      />
    </motion.div>
  );
}
