'use client';


import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  // Use a spring for a more natural, fluid animation
  const spring = useSpring(value, {
    stiffness: 300,
    damping: 25,
  });

  // Transform the spring value to a rounded integer for display
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  // Render the animated value
  return (
    <motion.div className={className}>
      {rounded}
    </motion.div>
  );
}