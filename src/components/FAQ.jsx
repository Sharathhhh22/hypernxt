import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

const FAQS = [
  {
    question: "How does BridgeAI actually work?",
    answer: "BridgeAI uses Google's advanced Gemini 3.6 Flash model. You type what you want to achieve in plain English (or Kannada), and the AI instantly maps out the exact official government or institutional procedures required, cutting out all the confusing bureaucracy."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We do not store any of your personal queries on our servers. Your intents are securely processed in real-time, and no sensitive PII is ever retained."
  },
  {
    question: "Which systems does it support?",
    answer: "Currently, BridgeAI maps out paths for Education (Scholarships, Admissions), Government Schemes, Healthcare Services, and Personal Finance. We are adding more institutional databases every week!"
  },
  {
    question: "Is this a free service?",
    answer: "Yes! BridgeAI is built as a public utility to democratize access to complex institutional knowledge. Our core path-finding engine will always remain free to use."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.section 
      variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col gap-12 w-full max-w-4xl mx-auto"
    >
      <motion.div variants={fadeInUp} className="text-center flex flex-col gap-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-lg">Everything you need to know about our platform.</p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {FAQS.map((faq, index) => (
          <motion.div key={index} variants={fadeInUp} className="glass-panel overflow-hidden transition-all duration-300">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
            >
              <h3 className="font-semibold text-lg text-white">{faq.question}</h3>
              {openIndex === index ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-500" />}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-gray-400 leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
