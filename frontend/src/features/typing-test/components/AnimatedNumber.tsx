'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  
  // Use a spring for a more natural, fluid animation
  const spring = useSpring(motionValue, {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  });

  // Transform the spring value to a rounded integer for display
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  // Update the motion value when the target `value` prop changes
  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  // Render the animated value
  return (
    <motion.div className={className}>
      {rounded}
    </motion.div>
  );
}