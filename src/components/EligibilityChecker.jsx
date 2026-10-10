import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const systemInstruction = `You are a Government Schemes Expert. 
Based on the user's profile, suggest EXACTLY 3 relevant government schemes they qualify for in India (Central or State).
Return a valid JSON object matching this structure:
{
  "schemes": [
    {
      "name": "Scheme Name",
      "why": "Brief explanation of why they qualify",
      "benefits": "Key financial or service benefits",
      "documents": ["Doc 1", "Doc 2"],
      "apply_link": "Name of official portal (e.g. National Scholarship Portal)"
    }
  ]
}`;

export default function EligibilityChecker() {
  const [formData, setFormData] = useState({
    profile: "Student",
    age: "",
    state: "",
    income: "",
    category: "General"
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkEligibility = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-3.6-flash",
        systemInstruction: systemInstruction,
        generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
      });
      
      const prompt = `Profile: ${formData.profile}, Age: ${formData.age}, State: ${formData.state}, Income: ${formData.income}, Category: ${formData.category}`;
      const response = await model.generateContent(prompt);
      let text = response.response.text().replace(/```json/gi, '').replace(/```/gi, '').trim();
      setResult(JSON.parse(text));
    } catch (err) {
      console.error(err);
      alert("Error checking eligibility.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 w-full mt-16 border border-primary/30 relative overflow-hidden" id="eligibility-checker">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Sparkles className="text-primary" /> What am I eligible for?
        </h2>
        <p className="text-gray-400 mt-2">Enter your details and our AI will match you with official government benefits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
        <select value={formData.profile} onChange={e=>setFormData({...formData, profile: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none">
          <option value="Student" className="bg-[#0a0a0a]">Student</option>
          <option value="Farmer" className="bg-[#0a0a0a]">Farmer</option>
          <option value="Employee" className="bg-[#0a0a0a]">Employee</option>
          <option value="Unemployed" className="bg-[#0a0a0a]">Unemployed</option>
          <option value="Senior Citizen" className="bg-[#0a0a0a]">Senior Citizen</option>
        </select>
        
        <input type="number" placeholder="Age" value={formData.age} onChange={e=>setFormData({...formData, age: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none" />
        
        <input type="text" placeholder="State (e.g. Karnataka)" value={formData.state} onChange={e=>setFormData({...formData, state: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none" />
        
        <input type="text" placeholder="Annual Income (₹)" value={formData.income} onChange={e=>setFormData({...formData, income: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none" />
        
        <select value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none">
          <option value="General" className="bg-[#0a0a0a]">General</option>
          <option value="OBC" className="bg-[#0a0a0a]">OBC</option>
          <option value="SC/ST" className="bg-[#0a0a0a]">SC/ST</option>
          <option value="Minority" className="bg-[#0a0a0a]">Minority</option>
        </select>
      </div>

      <div className="flex justify-center mt-6 relative z-10">
        <button onClick={checkEligibility} disabled={loading} className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50">
          {loading ? "Scanning Databases..." : "Check Eligibility"}
        </button>
      </div>

      {result && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {result.schemes.map((scheme, i) => (
            <div key={i} className="bg-black/40 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">{scheme.name}</h3>
              <p className="text-xs text-primary mb-4 font-medium uppercase tracking-wider">{scheme.apply_link}</p>
              
              <div className="space-y-3 text-sm">
                <div><span className="text-gray-500 block text-xs">Why you qualify:</span> <span className="text-gray-300">{scheme.why}</span></div>
                <div><span className="text-gray-500 block text-xs">Benefits:</span> <span className="text-green-400 font-medium">{scheme.benefits}</span></div>
                <div>
                  <span className="text-gray-500 block text-xs mb-1">Required Documents:</span> 
                  <div className="flex flex-wrap gap-1">
                    {scheme.documents.map((d, j)=><span key={j} className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">{d}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
