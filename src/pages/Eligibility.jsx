import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import EligibilityChecker from '../components/EligibilityChecker';

export default function Eligibility() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">AI Eligibility Checker</h1>
        <p className="text-gray-400">Find out which government schemes you qualify for instantly.</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <EligibilityChecker />
      </motion.div>
    </div>
  );
}
