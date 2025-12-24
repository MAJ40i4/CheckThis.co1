
import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { translations } from '../translations';
import { Currency, PlanTier } from '../types';

interface PricingProps {
  lang: 'pl' | 'en';
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onSelectPlan: (plan: PlanTier, price: string) => void;
  currentPlan: PlanTier;
}

const Pricing: React.FC<PricingProps> = ({ lang, currency, setCurrency, onSelectPlan, currentPlan }) => {
  const t = translations[lang].pricing;

  const prices = {
    FREE: { PLN: '0', EUR: '0', USD: '0' },
    PERSONAL: { PLN: '14,99', EUR: '3.99', USD: '4.99' },
    FAMILY: { PLN: '39,99', EUR: '9.99', USD: '12.99' },
    PRO: { PLN: '199', EUR: '49', USD: '59' }
  };

  const getPrice = (tier: PlanTier) => prices[tier][currency];
  const getSymbol = () => currency === 'PLN' ? 'zł' : currency === 'EUR' ? '€' : '$';

  const plans = [
    {
      id: 'FREE' as PlanTier,
      name: t.tiers.free.name,
      price: getPrice('FREE'),
      desc: t.tiers.free.desc,
      features: t.tiers.free.features,
      button: t.cta.free,
      highlight: false
    },
    {
      id: 'PERSONAL' as PlanTier,
      name: t.tiers.personal.name,
      price: getPrice('PERSONAL'),
      desc: t.tiers.personal.desc,
      features: t.tiers.personal.features,
      button: t.cta.buy,
      highlight: true
    },
    {
      id: 'FAMILY' as PlanTier,
      name: t.tiers.family.name,
      price: getPrice('FAMILY'),
      desc: t.tiers.family.desc,
      features: t.tiers.family.features,
      button: t.cta.buy,
      highlight: false
    },
    {
      id: 'PRO' as PlanTier,
      name: t.tiers.pro.name,
      price: getPrice('PRO'),
      desc: t.tiers.pro.desc,
      features: t.tiers.pro.features,
      button: t.cta.contact,
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">{t.title}</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">{t.subtitle}</p>
          
          {/* Currency Toggle */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl">
             {(['PLN', 'EUR', 'USD'] as Currency[]).map((c) => (
               <button
                 key={c}
                 onClick={() => setCurrency(c)}
                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${currency === c ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
               >
                 {c}
               </button>
             ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((tier, i) => {
            const isCurrent = currentPlan === tier.id;
            const currencySymbol = getSymbol();
            
            return (
              <div key={i} className={`p-6 rounded-[2rem] flex flex-col border transition-all duration-300 ${tier.highlight ? 'border-emerald-500 bg-emerald-50/50 shadow-xl scale-105 z-10' : 'border-slate-200 bg-white hover:border-emerald-200'}`}>
                {tier.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Best Value</div>}
                
                <h3 className="font-black text-lg mb-2 text-slate-900">{tier.name}</h3>
                <div className="text-3xl font-black mb-1 text-slate-900">
                  {tier.price !== '0' && <span className="text-lg align-top mr-1">{currency === 'USD' ? '$' : ''}</span>}
                  {tier.price}
                  {tier.price !== '0' && <span className="text-lg align-baseline ml-1">{currency === 'PLN' ? 'zł' : currency === 'EUR' ? '€' : ''}</span>}
                  <span className="text-sm font-medium text-slate-400 ml-1">/mo</span>
                </div>
                <p className="text-xs text-slate-500 mb-6 font-medium">{tier.desc}</p>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex gap-2 text-xs font-bold text-slate-600">
                      <Check className={`w-4 h-4 shrink-0 ${tier.highlight ? 'text-emerald-600' : 'text-emerald-500'}`} /> {f}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => onSelectPlan(tier.id, `${tier.price} ${currencySymbol}`)}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${
                    isCurrent 
                      ? 'bg-slate-200 text-slate-400 cursor-default'
                      : tier.highlight 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200' 
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isCurrent ? t.cta.free : tier.button}
                </button>
              </div>
          )})}
        </div>
        
        <div className="mt-12 text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-slate-400">
           <ShieldCheck className="w-4 h-4" />
           <p className="text-xs leading-relaxed font-medium">
             {t.vatInfo} 30-day money-back guarantee.
           </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
