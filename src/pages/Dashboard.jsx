import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Bookmark, ExternalLink } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchUserAndData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from('saved_plans')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });
            
          if (!error && data) {
            setPlans(data);
          }
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
    };
    
    fetchUserAndData();
  }, []);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-primary">Loading dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
        <p className="text-gray-400">Please log in to view your saved action plans.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 min-h-screen">
      <div className="mb-12 border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
        <p className="text-gray-400">Welcome back, {user.email}</p>
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="text-primary" size={20} />
        <h2 className="text-xl font-bold text-white">Saved Action Plans</h2>
      </div>
      
      {plans.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-12 text-center text-gray-500">
          You haven't saved any plans yet. Go to the Home page and ask the AI!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface border border-border rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-xl">
                  {plan.plan_data?.topic_icon || '📌'}
                </div>
                <h3 className="text-lg font-bold text-white">{plan.plan_data?.topic_title || 'Action Plan'}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">"{plan.intent}"</p>
              
              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                <p className="text-xs text-gray-500 uppercase">Key Resources</p>
                {(plan.plan_data?.resources || []).slice(0,2).map((res, i) => (
                  <a key={i} href="#" className="text-xs text-primary hover:underline flex items-center justify-between bg-primary/5 px-2 py-1.5 rounded">
                    <span>{res.name}</span>
                    <ExternalLink size={10}/>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
