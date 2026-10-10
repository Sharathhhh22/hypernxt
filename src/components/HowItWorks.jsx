import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import { Landmark, GraduationCap, FileText, Users, Briefcase, Tractor, HeartHandshake, Stethoscope, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  { icon: <Landmark className="text-primary" size={24} />, title: "Government Schemes", desc: "Central & State schemes, Housing, Pension & Startups.", url: "https://www.myscheme.gov.in/" },
  { icon: <GraduationCap className="text-secondary" size={24} />, title: "Student Services", desc: "Scholarships, Education loans & Skill-development.", url: "https://scholarships.gov.in/" },
  { icon: <FileText className="text-yellow-400" size={24} />, title: "Important Documents", desc: "Aadhaar, PAN, Voter ID, Income & Caste certificates.", url: "https://uidai.gov.in/" },
  { icon: <Users className="text-orange-400" size={24} />, title: "Citizen Services", desc: "Electricity bills, Property tax & PDS Ration cards.", url: "https://web.umang.gov.in/" },
  { icon: <Briefcase className="text-green-400" size={24} />, title: "Jobs & Employment", desc: "Government job notifications & Apprenticeships.", url: "https://www.ncs.gov.in/" },
  { icon: <Tractor className="text-amber-500" size={24} />, title: "Farmers & Agriculture", desc: "Crop insurance, subsidies & Irrigation support.", url: "https://pmkisan.gov.in/" },
  { icon: <HeartHandshake className="text-pink-400" size={24} />, title: "Women & Children", desc: "Welfare schemes, Nutrition & Maternity benefits.", url: "https://wcd.nic.in/" },
  { icon: <Stethoscope className="text-red-400" size={24} />, title: "Public Health", desc: "Govt hospitals, Health insurance & Vaccinations.", url: "https://pmjay.gov.in/" }
];

export default function HowItWorks() {
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col gap-12 w-full">
      <motion.div variants={fadeInUp} className="text-left max-w-2xl flex flex-col gap-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Government Services</h2>
        <p className="text-gray-400 text-lg font-light">
          A centralized directory of crucial public infrastructure. Instantly find official portals for your exact needs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service, index) => (
          <motion.a 
            href={service.url} target="_blank" rel="noreferrer"
            key={index} variants={fadeInUp} 
            className="group relative bg-surface hover:bg-surfaceHover border border-border hover:border-primary/50 p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 shadow-lg overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="text-primary" size={20} />
            </div>
            <div className="w-12 h-12 rounded-xl bg-dark/50 border border-border flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {service.icon}
            </div>
            <h3 className="text-lg font-bold text-white">{service.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light flex-grow">{service.desc}</p>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
