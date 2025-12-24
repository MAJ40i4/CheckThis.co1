
import React from 'react';
import { BrainCircuit, Globe, Layers, ShieldCheck, Zap, DollarSign } from 'lucide-react';
import { translations } from '../translations';

const icons = [BrainCircuit, Globe, Layers, Zap, DollarSign, ShieldCheck];

interface FeaturesProps {
  lang: 'pl' | 'en';
}

const Features: React.FC<FeaturesProps> = ({ lang }) => {
  const t = translations[lang].features;

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">{t.badge}</h2>
          <p className="text-4xl font-bold text-slate-900">{t.title}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {t.items.map((f, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all text-slate-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
