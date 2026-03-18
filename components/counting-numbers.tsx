'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountingNumbers({ from = 0, to = 100, duration = 2 }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCount((prev) => {
          if (prev >= to) {
            clearInterval(interval);
            return to;
          }
          return prev + 1;
        });
      },
      (duration * 1000) / (to - from),
    );

    return () => clearInterval(interval);
  }, [from, to, duration]);

  return (
    <motion.span
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="text-4xl text-secondary"
    >
      {count} ΜΕΛΗ
    </motion.span>
  );
}
