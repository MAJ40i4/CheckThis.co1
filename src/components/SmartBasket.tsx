
import React, { useMemo, useState } from 'react';
import { X, ShoppingBasket, ExternalLink, Trash2, CheckCircle, Info, ChevronRight, Store, ChevronDown, Tag, Package, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { BasketItem } from '../types';
import { translations } from '../translations';
import { getStoreProfile, getStoreActionLabel, getBasketUrl, getProductUrl } from '../services/storeService';

interface SmartBasketProps {
  isOpen: boolean;
  onClose: () => void;
  basket: BasketItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  lang: 'pl' | 'en';
}

const SmartBasket: React.FC<SmartBasketProps> = ({ isOpen, onClose, basket, onRemove, onClear, lang }) => {
  const t = translations[lang].basket;
  const [expandedStores, setExpandedStores] = useState<Record<string, boolean>>({});

  const toggleStore = (storeName: string) => {
    setExpandedStores(prev => ({ ...prev, [storeName]: !prev[storeName] }));
  };

  const stores = useMemo(() => {
    const summary: Record<string, { total: number; minTotal: number; maxTotal: number; currency: string; items: BasketItem[] }> = {};
    basket.forEach(item => {
      const store = item.offer.storeName;
      if (!summary[store]) {
        summary[store] = { total: 0, minTotal: 0, maxTotal: 0, currency: item.offer.currency, items: [] };
      }
      
      // Basic price parsing
      const priceVal = parseFloat(item.offer.price.replace(',', '.'));
      if (!isNaN(priceVal)) summary[store].total += priceVal;

      // Range parsing
      if (item.offer.priceMin) summary[store].minTotal += item.offer.priceMin;
      else if (!isNaN(priceVal)) summary[store].minTotal += priceVal;

      if (item.offer.priceMax) summary[store].maxTotal += item.offer.priceMax;
      else if (!isNaN(priceVal)) summary[store].maxTotal += priceVal;

      summary[store].items.push(item);
    });
    return Object.entries(summary).sort((a, b) => b[1].items.length - a[1].items.length);
  }, [basket]);

  // Set initial expansion state
  React.useEffect(() => {
    if (isOpen) {
        const initial: Record<string, boolean> = {};
        stores.forEach(([name]) => initial[name] = true);
        setExpandedStores(initial);
    }
  }, [isOpen, stores.length]); 

  const getStoreStyles = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('allegro')) return 'bg-orange-500';
    if (n.includes('frisco')) return 'bg-emerald-600';
    if (n.includes('auchan')) return 'bg-red-600';
    if (n.includes('ceneo')) return 'bg-blue-700';
    if (n.includes('kaufland')) return 'bg-red-700';
    if (n.includes('amazon')) return 'bg-slate-900';
    return 'bg-slate-700';
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col animate-[slide-in_0.3s_ease-out] border-l border-slate-100">
        <style>{`
          @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        `}</style>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShoppingBasket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none">{t.title}</h2>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{basket.length} {t.items}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          {basket.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 px-6">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBasket className="w-10 h-10 text-slate-300" />
              </div>
              <p className="font-bold text-slate-400">{t.empty}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {stores.map(([storeName, data]) => {
                const isExpanded = expandedStores[storeName];
                const profile = getStoreProfile(storeName);
                const actionLabel = getStoreActionLabel(profile.capability, lang);
                // Updated to use getBasketUrl from service
                const storeUrl = getBasketUrl(storeName, data.items);

                // Determine display price (range or single)
                const isRange = data.minTotal !== data.maxTotal && data.minTotal > 0;
                
                return (
                  <div key={storeName} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
                    
                    {/* Store Header */}
                    <div 
                        className="bg-slate-50/80 p-4 flex flex-col border-b border-slate-100"
                    >
                       <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleStore(storeName)}>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs ${getStoreStyles(storeName)} shadow-sm`}>
                              {storeName[0]}
                            </div>
                            <div>
                              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                {storeName}
                                {profile.capability === 'full_cart_support' && (
                                  <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold normal-case tracking-normal">Auto Cart</span>
                                )}
                              </h3>
                              <div className="text-[10px] text-slate-500 font-medium">{data.items.length} {t.items}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                             <div className="text-right">
                                 <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.totalAt}</div>
                                 <div className="font-black text-slate-900 text-lg leading-tight">
                                   {isRange 
                                      ? `${data.minTotal.toFixed(2)} - ${data.maxTotal.toFixed(2)}`
                                      : data.total.toFixed(2)
                                   } <span className="text-sm text-slate-500">{data.currency}</span>
                                 </div>
                             </div>
                             <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                       </div>
                       
                       {/* Store Action Button */}
                       {isExpanded && (
                         <div className="mt-2 pt-2 border-t border-slate-100/50 flex gap-2">
                            <a 
                                href={storeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                                    profile.capability === 'full_cart_support' 
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {profile.capability === 'full_cart_support' ? <ShoppingBasket className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                                {actionLabel}
                            </a>
                         </div>
                       )}
                       
                       {profile.capability !== 'full_cart_support' && isExpanded && (
                          <div className="mt-2 flex items-start gap-1.5 text-[10px] text-slate-400 leading-tight">
                             <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                             {profile.capability === 'partial_cart_support' ? 'Partial automation. You may need to add items manually.' : 'Manual checkout required. Links provided below.'}
                          </div>
                       )}
                    </div>

                    {/* Product List */}
                    {isExpanded && (
                      <div className="divide-y divide-slate-50 animate-fade-in">
                        {data.items.map((item) => {
                          const hasRange = item.offer.priceMin && item.offer.priceMax && item.offer.priceMin !== item.offer.priceMax;
                          // Use smart getProductUrl
                          const itemLink = getProductUrl(item.offer, item.productName);

                          return (
                          <div key={item.id} className="p-4 flex items-start gap-3 hover:bg-slate-50/50 transition-colors group/item">
                            {/* Remove Button */}
                             <button 
                                  onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0 mt-1"
                                  title="Remove"
                                >
                                  <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="flex-1 min-w-0">
                               <div className="flex items-start justify-between gap-2">
                                  <div className="font-bold text-slate-800 text-sm leading-snug">{item.productName}</div>
                                  <div className={`text-xs font-black px-2 py-1 rounded shrink-0 ${hasRange ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-600'}`}>
                                    {hasRange 
                                        ? `${item.offer.priceMin}-${item.offer.priceMax} ${item.offer.currency}`
                                        : `${item.offer.price} ${item.offer.currency}`
                                    }
                                  </div>
                               </div>
                               
                               <div className="flex flex-wrap items-center gap-2 mt-2">
                                  {item.offer.deliveryInfo && (
                                     <div className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400">
                                        <Package className="w-3 h-3" />
                                        {item.offer.deliveryInfo}
                                     </div>
                                  )}
                                  {item.offer.priceConfidence && (
                                      <div className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase ${
                                          item.offer.priceConfidence === 'High' ? 'text-emerald-500' : 'text-amber-500'
                                      }`}>
                                          <Tag className="w-3 h-3" />
                                          {item.offer.priceConfidence} Confidence
                                      </div>
                                  )}
                               </div>
                            </div>

                            {/* Direct Link Button */}
                            <a 
                              href={itemLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all shrink-0 mt-1"
                              title={t.checkout}
                            >
                              <LinkIcon className="w-4 h-4" />
                            </a>
                          </div>
                        )})}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {basket.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
            <div className="flex gap-3">
                <button 
                  onClick={onClear}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 font-bold text-xs uppercase tracking-widest transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 bg-slate-900 text-white font-black py-3 rounded-xl shadow-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                  <CheckCircle className="w-4 h-4" /> Close
                </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SmartBasket;
