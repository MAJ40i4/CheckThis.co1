
import React from 'react';
import { ShieldCheck, Database, Scale, Eye } from 'lucide-react';

const Ethics = () => {
  const principles = [
    { icon: Scale, title: "Independent Scores", desc: "Our AI analysis is decoupled from commerce. We do not accept payment to improve health scores." },
    { icon: Database, title: "Scientific Sourcing", desc: "We reference established databases (OpenFoodFacts, USDA) and peer-reviewed studies." },
    { icon: Eye, title: "Transparency", desc: "We clearly label sponsored alternatives and affiliate links. They never affect the verdict." },
    { icon: ShieldCheck, title: "Data Privacy", desc: "We analyze products, not people. Your health profile data stays local or encrypted." }
  ];

  return (
    <section id="ethics" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 rounded-full text-slate-700 text-[10px] font-black uppercase tracking-widest mb-4">
             <ShieldCheck className="w-3 h-3" /> Our Promise
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Ethics & Transparency</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">CheckThis is built on trust. We believe you deserve to know exactly how our algorithms work and how we make money.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {principles.map((p, i) => (
             <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 text-slate-900">
                   <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Ethics;
