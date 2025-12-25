
import React, { useState } from 'react';
import { translations } from '../translations';
import { BookOpen, ThumbsUp, ThumbsDown, ArrowRight, Activity, Brain, Quote } from 'lucide-react';

interface CheckInBlogProps {
  lang: 'pl' | 'en';
}

const CheckInBlog: React.FC<CheckInBlogProps> = ({ lang }) => {
  const t = translations[lang].blog;
  const [activeTab, setActiveTab] = useState<'science' | 'rankings'>('science');

  return (
    <section id="blog" className="py-24 bg-white relative animate-fade-in min-h-[85vh]">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-800 text-xs font-black uppercase tracking-widest mb-4">
             <BookOpen className="w-4 h-4" /> CheckIn Blog
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{t.title}</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100 p-1.5 rounded-full flex gap-1 shadow-inner">
            <button
              onClick={() => setActiveTab('science')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'science' 
                  ? 'bg-white text-emerald-600 shadow-lg scale-105' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.tabs.science}
            </button>
            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'rankings' 
                  ? 'bg-white text-emerald-600 shadow-lg scale-105' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.tabs.rankings}
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'science' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.facts.map((fact, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 font-black text-lg shadow-sm shrink-0">
                    {i + 1}
                  </div>
                  <Brain className="w-6 h-6 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-3">{fact.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6 flex-1">{fact.desc}</p>
                
                {/* Source attribution */}
                <div className="pt-5 border-t border-slate-200/60 mt-auto flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <Quote className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        {t.source}: <span className="text-emerald-600">{fact.source}</span>
                    </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {t.comparisons.map((comp, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 bg-slate-100 px-6 py-3 rounded-bl-3xl text-xs font-black uppercase tracking-widest text-slate-500 border-l border-b border-slate-200">
                    {comp.category}
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6 mt-8">
                    {/* Better Choice */}
                    <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                           {t.rankings.betterChoice}
                        </div>
                        <div className="mt-4 mb-3 flex justify-center">
                           <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                              <ThumbsUp className="w-7 h-7 text-emerald-600" />
                           </div>
                        </div>
                        <p className="text-center font-bold text-slate-900 text-sm leading-tight">{comp.better}</p>
                    </div>

                    {/* Avoid */}
                    <div className="bg-red-50/50 rounded-2xl p-5 border border-red-100 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                           {t.rankings.avoid}
                        </div>
                        <div className="mt-4 mb-3 flex justify-center">
                           <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                              <ThumbsDown className="w-7 h-7 text-red-600" />
                           </div>
                        </div>
                        <p className="text-center font-bold text-slate-900 text-sm leading-tight">{comp.worse}</p>
                    </div>
                 </div>

                 <div className="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{t.rankings.why}</p>
                    <p className="text-sm text-slate-600 italic font-medium leading-relaxed">
                       "{comp.reason}"
                    </p>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckInBlog;
