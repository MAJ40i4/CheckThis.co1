
import React from 'react';
import { translations } from '../translations';

interface HowItWorksProps {
  lang: 'pl' | 'en';
}

const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const t = translations[lang].howItWorks;

  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-16">
          {t.steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="text-8xl font-black text-slate-200/50 absolute -top-10 -left-4 -z-0">
                {`0${i + 1}`}
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
