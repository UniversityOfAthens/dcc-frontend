'use client';

import { useState, useEffect } from 'react';

export default function CountingNumbers({ from = 0, to = 100, duration = 2, className = '' }) {
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

  return <span className={`tabular-nums ${className}`}>{count}</span>;
}
