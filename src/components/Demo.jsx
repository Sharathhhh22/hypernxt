import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, FileText, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { fadeInUp, hoverCard } from '../animations/motionVariants';
import { supabase } from '../lib/supabaseClient';

export default function Demo({ result, loading, userIntent }) {
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSave = async () => {
    if (!user) {
      alert("Please log in to save action plans.");
      return;
    }
    
    if (import.meta.env.VITE_SUPABASE_URL === undefined) {
      alert("Supabase is not configured yet! Connect it to save data.");
      return;
    }

    try {
      const { error } = await supabase
        .from('saved_plans')
        .insert([{ user_id: user.id, intent: userIntent, plan_data: result }]);
        
      if (error) throw error;
      setSaved(true);
    } catch (err) {
      alert("Note: Supabase table 'saved_plans' might not exist yet! " + err.message);
    }
  };
  
  if (!result && !loading) {
    return (
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="glass-panel p-1 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center opacity-50 grayscale">
         <div className="text-center w-full col-span-2 py-20 text-gray-500">Awaiting your intent...</div>
      </motion.section>
    );
  }

  return (
    <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-1 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col gap-6 p-6">
        <h2 className="text-3xl font-bold">Your Personalized Path</h2>
        <p className="text-gray-400">We analyzed your request and mapped out the official process for you.</p>
        
        <div className="bg-surface border border-border rounded-xl p-4 mt-4">
          <p className="text-gray-300">"{userIntent}"</p>
        </div>
        
        {loading ? (
          <div className="flex items-center gap-3 text-primary text-sm font-medium mt-2">
            <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            Understanding intent and consulting Gemini...
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-green-400 text-sm font-medium mt-2">
              <CheckCircle2 size={16} />
              {result?.understanding || "Path mapped successfully."}
            </div>
            
            <button 
              onClick={handleSave}
              className={`w-fit px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-surface hover:bg-surfaceHover border border-border text-gray-300'}`}
            >
              {saved ? <><BookmarkCheck size={16}/> Saved to Profile</> : <><Bookmark size={16}/> Save Plan</>}
            </button>
          </div>
        )}
      </div>
      
      {!loading && result && (
        <motion.div variants={hoverCard} initial="rest" whileHover="hover" className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500" />
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-2xl">
                {result.topic_icon && result.topic_icon.length > 5 ? '📌' : result.topic_icon}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-white">{result.topic_title}</h3>
              <p className="text-sm text-primary">Official Action Plan</p>
            </div>
            
            <button 
              onClick={() => document.getElementById('search-container').scrollIntoView({ behavior: 'smooth' })}
              className="ml-auto text-xs bg-surface hover:bg-primary/20 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-border flex items-center gap-1 transition-colors"
            >
               Regenerate
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {(result.action_plan || []).map((action, i) => (
               <div key={i} className={`flex items-start gap-4 text-base ${action.status === 'done' ? 'text-gray-400 opacity-50' : 'text-white font-medium bg-surface p-4 rounded-xl border border-border'}`}>
                 <div className="mt-1 flex-shrink-0">
                    {action.status === 'done' ? <CheckCircle2 size={20} className="text-green-500" /> : <ChevronRight size={20} className="text-primary" />}
                 </div>
                 <div className="leading-relaxed">{action.step}</div>
               </div>
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-border flex flex-col gap-4">
             <div>
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Required Documents</p>
                <div className="flex flex-wrap gap-2">
                  {(result.documents || []).map((doc, i) => (
                    <span key={i} className="text-xs bg-surface text-gray-300 px-2 py-1 rounded border border-border flex items-center gap-1">
                      <FileText size={12}/> {doc}
                    </span>
                  ))}
                </div>
             </div>

             <div>
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Official Resources</p>
                <div className="flex flex-col gap-2">
                  {(result.resources || []).map((res, i) => (
                    <a key={i} href="#" className="text-sm text-primary hover:underline flex items-center justify-between bg-primary/10 px-3 py-2 rounded-lg">
                      <span>{res.name}</span>
                      <span className="text-xs flex items-center gap-1">{res.action} <ExternalLink size={12}/></span>
                    </a>
                  ))}
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
