import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const GOV_LINKS = [
    { name: "MyScheme Portal", url: "https://www.myscheme.gov.in/" },
    { name: "National Scholarship", url: "https://scholarships.gov.in/" },
    { name: "UMANG App", url: "https://web.umang.gov.in/" },
    { name: "Digital India", url: "https://www.digitalindia.gov.in/" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-lg border-b border-border py-4 shadow-2xl' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        <Link to="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-secondary shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
          HyperNxt
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 items-center">
          <Link to="/" className={`${isActive('/') ? 'text-white font-bold' : 'hover:text-white'} transition-colors`}>Home</Link>
          
          <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
            <Link to="/services" className={`flex items-center gap-1 transition-colors py-2 ${isActive('/services') ? 'text-white font-bold' : 'hover:text-white'}`}>
              Gov Services <ChevronDown size={14} />
            </Link>
            <AnimatePresence>
              {menuOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-64 bg-dark/90 backdrop-blur-xl border border-border p-2 py-4 flex flex-col gap-1 shadow-2xl rounded-xl">
                  <p className="text-xs font-bold text-gray-500 px-4 mb-2 uppercase tracking-wider">Official Portals</p>
                  {GOV_LINKS.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noreferrer" className="px-4 py-2 hover:bg-surfaceHover rounded-lg text-gray-300 hover:text-white transition-colors flex justify-between items-center">
                      {link.name} <ExternalLink size={12} className="opacity-50" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/eligibility" className={`${isActive('/eligibility') ? 'text-white font-bold' : 'hover:text-white'} transition-colors`}>Eligibility Checker</Link>
          {user && <Link to="/dashboard" className={`${isActive('/dashboard') ? 'text-white font-bold' : 'hover:text-white'} transition-colors`}>Dashboard</Link>}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300 flex items-center gap-2"><UserIcon size={14} className="text-primary"/> {user.email.split('@')[0]}</span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors" title="Logout"><LogOut size={16}/></button>
            </div>
          ) : (
            <button onClick={() => setAuthModalOpen(true)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Log in
            </button>
          )}
          <Link to="/eligibility" className="px-5 py-2 rounded-full bg-primary hover:bg-primary/80 text-white text-sm font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]">
            Check Eligibility
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-border absolute top-full left-0 right-0 overflow-hidden">
            <div className="flex flex-col p-6 gap-4 text-white font-medium">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 border-b border-white/5">Home</Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 border-b border-white/5">Gov Services</Link>
              <Link to="/eligibility" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 border-b border-white/5">Check Eligibility</Link>
              {user && <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 border-b border-white/5">Dashboard</Link>}
              {user ? (
                 <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-left py-2 text-red-400">Logout</button>
              ) : (
                 <button onClick={() => {setMobileMenuOpen(false); setAuthModalOpen(true);}} className="text-left py-2 text-primary">Log in</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onLogin={(u) => setUser(u)} />
    </>
  );
}
