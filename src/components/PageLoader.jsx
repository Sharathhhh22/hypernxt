import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                {/* Glowing Orbs */}
                <motion.div 
                  animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-20px] rounded-full border border-primary/30 border-t-primary border-b-secondary opacity-50"
                />
                <motion.div 
                  animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-10px] rounded-full border border-secondary/30 border-r-primary border-l-secondary opacity-50"
                />
                
                {/* Center Logo */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center justify-center">
                   <span className="text-white font-bold text-2xl tracking-tighter">HN</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold tracking-widest text-white uppercase">HyperNxt</h1>
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && children}
    </>
  );
}
