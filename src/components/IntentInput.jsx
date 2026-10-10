import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function IntentInput({ onAnalyze }) {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onAnalyze(text);
      document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTagClick = (tagText) => {
    setText(tagText);
    onAnalyze(tagText);
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-4 w-full text-left">
      <motion.div 
        animate={{ borderColor: focused ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)' }}
        className="glass-panel p-2 flex flex-col md:flex-row gap-2 transition-colors duration-300 relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent resize-none border-none outline-none text-white placeholder-gray-500 p-4 min-h-[80px] w-full"
          placeholder="What are you trying to accomplish?"
        />
        <div className="flex items-end p-2 flex-shrink-0">
          <button onClick={handleSubmit} className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
            Find My Path <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
      
      <div className="flex flex-col gap-3 mt-4">
        <p className="text-sm font-medium text-gray-300">Try asking:</p>
        <div className="flex flex-wrap gap-2 justify-start">
          {[
            "I want to apply for a scholarship.", 
            "I lost my marks card.", 
            "I need an internship.", 
            "I want to find a government scheme."
          ].map((tag, i) => (
            <span onClick={() => handleTagClick(tag)} key={i} className="text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full cursor-pointer hover:bg-primary/20 hover:text-white transition-colors font-medium">
              "{tag}"
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
