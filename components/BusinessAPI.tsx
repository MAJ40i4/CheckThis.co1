
import React from 'react';
import { Database, Code, LineChart, Globe } from 'lucide-react';
import { translations } from '../translations';

const icons = [Code, Globe, Database, LineChart];

interface BusinessAPIProps {
  lang: 'pl' | 'en';
}

const BusinessAPI: React.FC<BusinessAPIProps> = ({ lang }) => {
  const t = translations[lang].business;

  return (
    <section id="business" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[100px] -mr-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">{t.badge}</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{t.title}</h3>
            <p className="text-slate-400 text-lg mb-10">{t.desc}</p>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {t.items.map((item, i) => {
                const Icon = icons[i];
                return (
                  <div key={i} className="flex gap-4">
                    <Icon className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all flex items-center gap-2">
              {t.cta} <Code className="w-5 h-5" />
            </button>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-[2rem] font-mono text-sm text-emerald-400 shadow-2xl">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-orange-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              </div>
              <pre className="overflow-x-auto">
{`POST /api/v1/analyze
{
  "input": "https://amazon.com/dp/B07...",
  "context": {
    "goals": ["keto", "low-sodium"],
    "allergies": ["peanut"]
  }
}

// Response
{
  "verdict": "92/100",
  "personalized_alerts": [
    "Ideal for Keto: 0.2g net carbs",
    "Contains trace soy"
  ],
  "stores": [
    {"name": "WholeFoods", "price": 4.99}
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessAPI;
