import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll progress with a gentle spring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
      <motion.div
        style={{ scaleX }}
        className="h-full w-full bg-gradient-to-r from-[#0A251D] via-[#123B2F] to-[#10B981] origin-left"
        aria-hidden="true"
      />
    </div>
  );
};
