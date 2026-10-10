import React from 'react';
import { Mail, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-12 bg-black/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-tr from-primary to-blue-400"></div>
            Hypernxt
          </div>
          <p className="text-sm text-gray-500">Universal bridge to complex systems.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-center gap-2 border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0">
          <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Contact Developer</p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
             <User size={14} className="text-primary"/> Sharath
          </div>
          <a href="mailto:sharathchandra5252@gmail.com" className="flex items-center gap-2 text-primary hover:text-white transition-colors text-sm">
             <Mail size={14} /> sharathchandra5252@gmail.com
          </a>
        </div>

        <div className="flex gap-6 text-sm text-gray-400 md:justify-end justify-center">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center flex flex-col gap-2">
        <p className="text-gray-400 text-sm font-medium tracking-wide">
          Designed and developed by <span className="text-primary font-bold">Sharath</span>
        </p>
      </div>
    </footer>
  );
}
