import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, FileSearch } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import IntentInput from './IntentInput';

export default function Hero({ onAnalyze }) {
  const scrollToEligibility = () => {
    document.getElementById('eligibility').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section 
      variants={staggerContainer} initial="hidden" animate="visible"
      className="flex flex-col md:flex-row items-center justify-between gap-12 w-full relative min-h-[70vh]"
    >
      {/* Floating abstract elements for modern tech feel */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-[120px] pointer-events-none animate-float-delayed"></div>

      <div className="flex-1 flex flex-col gap-6 text-left relative z-10">
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-sm text-primary w-fit shadow-lg backdrop-blur-md">
          <Sparkles size={16} />
          Powered by Gemini 3.6 Flash
        </motion.div>
        
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          Navigate Systems <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            With AI Precision.
          </span>
        </motion.h1>
        
        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
          HyperNxt eliminates bureaucratic friction. Describe what you need, and our AI instantly maps out eligibility, requirements, and official portals.
        </motion.p>
        
        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mt-2">
          <button onClick={() => document.getElementById('search-container').scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2">
            Start Search <FileSearch size={18} />
          </button>
          <button onClick={scrollToEligibility} className="px-6 py-3 rounded-full bg-surface border border-border text-white font-semibold hover:bg-surfaceHover transition-all flex items-center gap-2">
            Check Eligibility <ShieldCheck size={18} />
          </button>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="flex-1 w-full relative z-10" id="search-container">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-xl opacity-50 pointer-events-none" />
        <IntentInput onAnalyze={onAnalyze} />
      </motion.div>
    </motion.section>
  );
}
