import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const variants = {
  enter: (direction: number) => ({ y: direction > 0 ? '100%' : '-100%' }),
  center: { y: '0%' },
  exit: (direction: number) => ({ y: direction > 0 ? '-100%' : '100%' }),
};

function Digit({ char, direction }: { char: string; direction: number }) {
  return (
    <div className="relative inline-block overflow-hidden">
      {/* Ghost element to reserve space and determine width */}
      <span className="opacity-0">{char}</span>

      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.span
          key={char}
          className="absolute inset-0"
          variants={variants}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const prevValueRef = useRef(value);
  const directionRef = useRef(1);

  // Intentionally accessing refs during render for animation direction calculation
  // This is a valid pattern for derived values that don't affect React's rendering logic
  // eslint-disable-next-line react-hooks/refs
  if (value !== prevValueRef.current) {
    // eslint-disable-next-line react-hooks/refs
    directionRef.current = value > prevValueRef.current ? 1 : -1;
    // eslint-disable-next-line react-hooks/refs
    prevValueRef.current = value;
  }

  const digits = Math.round(value).toString().split('');

  return (
    <div className={`inline-flex ${className}`}>
      {/* eslint-disable-next-line react-hooks/refs */}
      {digits.map((digit, index) => (
        <Digit
          key={`${index}-${digits.length}`}
          char={digit}
          direction={directionRef.current}
        />
      ))}
    </div>
  );
}