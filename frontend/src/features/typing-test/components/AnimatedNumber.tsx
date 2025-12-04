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

  if (value !== prevValueRef.current) {
    directionRef.current = value > prevValueRef.current ? 1 : -1;
    prevValueRef.current = value;
  }

  const digits = Math.round(value).toString().split('');

  return (
    <div className={`inline-flex ${className}`}>
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