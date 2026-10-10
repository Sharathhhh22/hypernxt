import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import IntentInput from '../components/IntentInput';
import Demo from '../components/Demo';

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userIntent, setUserIntent] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnalyze = (data, intentStr) => {
    setUserIntent(intentStr);
    setLoading(true);
    setResult(null);
    
    setTimeout(() => {
      setResult(data);
      setLoading(false);
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-24 relative z-10">
        <IntentInput onAnalyze={handleAnalyze} />
        
        <div id="results-section" className="mt-12">
            <Demo result={result} loading={loading} userIntent={userIntent} />
        </div>
      </div>

      <button 
        onClick={() => document.getElementById('search-container')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-blue-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center group"
        title="Ask Gemini AI Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-300 ease-in-out font-bold text-sm">
          Ask Gemini AI
        </span>
      </button>
    </div>
  );
}
