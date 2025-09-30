import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [exiting, setExiting] = React.useState(false);
  const visibleDuration = 3000; // default visible time
  const exitDuration = 500; // ms

  React.useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      const finish = setTimeout(() => onLoadingComplete(), exitDuration);
      return () => clearTimeout(finish);
    }, visibleDuration);

    return () => clearTimeout(t);
  }, [onLoadingComplete]);

  const ring = { rotate: 360 };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'linear-gradient(180deg, rgba(8,12,16,0.6), rgba(8,12,16,0.68))', backdropFilter: 'blur(6px)' }}
      animate={exiting ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
      transition={{ duration: exiting ? 0.45 : 0.5, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="relative w-36 h-36 rounded-full border border-white/8 bg-white/3 backdrop-blur-md"
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            animate={ring}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-2.5 h-2.5 rounded-full bg-white/80"
                  initial={{ opacity: 0.6, y: 0 }}
                  animate={{ opacity: [0.6, 1, 0.6], y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.12, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p className="text-sm text-white/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Loading map and data…</motion.p>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
