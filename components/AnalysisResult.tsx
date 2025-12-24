
import React, { useState, useMemo } from 'react';
import { ProductAnalysis, UserPersona, StoreOffer, BasketItem, SearchMatch } from '../types';
import { CheckCircle, XCircle, ShoppingCart, Activity, Zap, ExternalLink, Tag, Truck, TrendingDown, Image as ImageIcon, ZoomIn, Info, ThumbsUp, AlertTriangle, Shield, HeartPulse, Baby, Search, ArrowRight, DollarSign, Clock, PackageCheck, Loader2, ThumbsDown, Check, Lock, Plus, BarChart2 } from 'lucide-react';
import { translations } from '../translations';
import { getProductUrl } from '../services/storeService';

interface AnalysisResultProps {
  data: ProductAnalysis;
  persona: UserPersona;
  onReset: () => void;
  lang: 'pl' | 'en';
  onAddToBasket: (offer: StoreOffer, productName: string) => void;
  basket: BasketItem[];
  onSelectMatch: (match: SearchMatch) => void;
  userImage: { data: string; mimeType: string } | null;
  onAnalyze: (input: string) => void;
  userPlan: 'FREE' | 'PERSONAL' | 'FAMILY' | 'PRO';
  onUnlock: () => void;
}

const ConfidenceBadge = ({ level }: { level: string }) => {
  const styles = level === 'High' ? 'bg-emerald-100 text-emerald-700' : level === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${styles}`}>
      <Shield className="w-3 h-3" />
      {level} Confidence
    </div>
  );
};

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, persona, onReset, lang, onAddToBasket, basket, onSelectMatch, userImage, onAnalyze, userPlan, onUnlock }) => {
  const t = translations[lang].results;
  const isFree = userPlan === 'FREE';
  const [activeIngredientTab, setActiveIngredientTab] = useState('All');
  
  // Sort offers by price
  const offers = [...data.offers].sort((a, b) => {
     // Sort by max price to be conservative, or min price to be optimistic. Let's use avg if range.
     const getPrice = (o: StoreOffer) => o.priceMin ? (o.priceMin + (o.priceMax || o.priceMin)) / 2 : parseFloat(o.price);
     return getPrice(a) - getPrice(b);
  });
  
  const lowestOffer = offers.length > 0 ? offers[0] : null;
  
  // FIXED: Logic to handle undefined priceMax properly
  const lowestPriceStr = lowestOffer 
    ? (lowestOffer.priceMin && lowestOffer.priceMax && lowestOffer.priceMin !== lowestOffer.priceMax 
        ? `${lowestOffer.priceMin.toFixed(2)}-${lowestOffer.priceMax.toFixed(2)}` 
        : (lowestOffer.priceMin ? lowestOffer.priceMin.toFixed(2) : lowestOffer.price)) 
    : "X,XX";

  // Get Smart Link for the main teaser button
  const teaserLink = lowestOffer ? getProductUrl(lowestOffer, data.productName) : '#';

  return (
    <div id="results" className="max-w-4xl mx-auto px-4 py-24 animate-fade-in scroll-mt-20">
      
      {/* 1. Health Overview (Always Visible) */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden mb-8">
        <div className="p-8 border-b border-slate-100">
           <div className="flex justify-between items-start mb-6">
              <div>
                 <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t.healthOverview}</h2>
                 <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">{data.productName}</h1>
                 <ConfidenceBadge level={data.scoreConfidence} />
              </div>
              <div className="flex flex-col items-center">
                 <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-lg ${data.score > 80 ? 'bg-emerald-500' : data.score > 50 ? 'bg-orange-500' : 'bg-red-500'}`}>
                    {data.score}
                 </div>
                 <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase">{t.personalScore}</span>
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              <div>
                 <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" /> {t.goodPoints}
                 </h3>
                 <ul className="space-y-2">
                    {data.pros.map((pro, i) => (
                       <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {pro}
                       </li>
                    ))}
                 </ul>
              </div>
              <div>
                 <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4" /> {t.concerns}
                 </h3>
                 <ul className="space-y-2">
                    {data.cons.map((con, i) => (
                       <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> {con}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
        
        {/* Price Teaser (Free) or Full (Pro) */}
        <div className="bg-slate-50 p-6 flex items-center justify-between">
           <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t.bestOffers}</div>
              <div className="text-2xl font-black text-slate-900">{lowestPriceStr} <span className="text-sm font-bold text-slate-500">{offers[0]?.currency}</span></div>
           </div>
           {isFree ? (
              <button onClick={onUnlock} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-emerald-700 transition-colors">
                 {t.seeWhereToBuy}
              </button>
           ) : (
              <a 
                href={teaserLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                 {t.goToStore} <ExternalLink className="w-4 h-4" />
              </a>
           )}
        </div>
      </div>

      {/* 2. Locked Content Section */}
      <div className="relative">
         {isFree && (
            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/60 flex flex-col items-center justify-center rounded-[2rem] border border-slate-200">
               <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm border border-slate-100">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                     <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{t.unlockTitle}</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">{t.unlockDesc}</p>
                  <button onClick={onUnlock} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-lg">
                     {t.unlockButton}
                  </button>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">{t.cancelAnytime}</p>
               </div>
            </div>
         )}

         {/* Blurred/Visible Content */}
         <div className={`space-y-8 ${isFree ? 'opacity-50 pointer-events-none select-none' : ''}`}>
            
            {/* Ingredients */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" /> {t.ingredientBreakdown}
               </h3>
               <div className="space-y-4">
                  {data.ingredients.slice(0, isFree ? 3 : undefined).map((ing, i) => (
                     <div key={i} className="border-b border-slate-50 pb-4 last:border-0">
                        <div className="flex justify-between font-bold text-slate-900 mb-1">
                           {ing.name}
                           <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${ing.impact === 'negative' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>{ing.impact}</span>
                        </div>
                        <p className="text-sm text-slate-500">{ing.details}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Alternatives */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" /> {t.alternatives}
               </h3>
               <div className="grid md:grid-cols-2 gap-4">
                  {data.alternatives.map((alt, i) => (
                     <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="font-bold text-slate-900 mb-1">{alt.name}</div>
                        <div className="text-sm text-emerald-600 font-bold mb-2">Score: {alt.score}</div>
                        <p className="text-xs text-slate-500">{alt.reason}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Price Comparison */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-600" /> {t.priceComparison}
                 </h3>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <BarChart2 className="w-3 h-3" /> Price Intelligence
                 </div>
               </div>
               <div className="space-y-3">
                  {offers.map((offer, i) => {
                     // FIXED: Check for undefined priceMax
                     const isRange = offer.priceMin && offer.priceMax && offer.priceMin !== offer.priceMax;
                     const displayPrice = isRange 
                        ? `${offer.priceMin!.toFixed(2)}-${offer.priceMax!.toFixed(2)}` 
                        : (offer.priceMin ? offer.priceMin.toFixed(2) : offer.price);

                     const smartLink = getProductUrl(offer, data.productName);

                     return (
                     <div key={i} className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                        <div className="flex-1">
                           <div className="font-bold text-slate-900">{offer.storeName}</div>
                           <div className="flex items-center gap-2 mt-0.5">
                              {offer.priceConfidence && (
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${offer.priceConfidence === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                   {offer.priceConfidence} Conf.
                                </span>
                              )}
                              <span className="text-xs text-slate-400 truncate max-w-[120px]">{offer.deliveryInfo}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="text-right">
                              <div className="text-lg font-black text-slate-900">
                                {displayPrice} 
                                <span className="text-xs font-bold text-slate-500 ml-1">{offer.currency}</span>
                              </div>
                              {isRange && <div className="text-[9px] text-slate-400 font-medium">Est. Range</div>}
                           </div>
                           
                           {/* Action Buttons */}
                           <div className="flex items-center gap-2">
                              <button 
                                 onClick={() => onAddToBasket(offer, data.productName)}
                                 className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-500 hover:text-white transition-all transform active:scale-95"
                                 title={t.addBasket}
                              >
                                 <Plus className="w-4 h-4" />
                                 <span className="sr-only">{t.addBasket}</span>
                              </button>
                              
                              <a 
                                 href={smartLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="p-2.5 bg-slate-100 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-white transition-all transform active:scale-95"
                                 title={t.viewDetails}
                              >
                                 <ExternalLink className="w-4 h-4" />
                                 <span className="sr-only">{t.viewDetails}</span>
                              </a>
                           </div>
                        </div>
                     </div>
                  )})}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
