import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (import.meta.env.VITE_SUPABASE_URL === undefined) {
      setError("Supabase not connected. Please add VITE_SUPABASE_URL to .env");
      setLoading(false);
      return;
    }

    try {
      let data, err;
      if (isSignUp) {
        const { data: d, error: e } = await supabase.auth.signUp({ email, password });
        data = d; err = e;
      } else {
        const { data: d, error: e } = await supabase.auth.signInWithPassword({ email, password });
        data = d; err = e;
      }

      if (err) throw err;
      if (data.user) {
        onLogin(data.user);
        onClose();
      } else if (isSignUp) {
        setError("Check your email for the confirmation link!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark border border-border w-full max-w-md rounded-2xl p-6 relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="text-sm text-gray-400 mb-6">Sign in to save your action plans and eligibility checks.</p>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4">{error}</div>}
        
        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="email" required placeholder="Email Address"
              value={email} onChange={e=>setEmail(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="password" required placeholder="Password"
              value={password} onChange={e=>setPassword(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-primary transition-colors"
            />
          </div>
          
          <button disabled={loading} className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:opacity-50 mt-2">
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-400 mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline ml-2 font-medium">
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
