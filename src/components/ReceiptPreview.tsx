
import React from 'react';
import { ReceiptAnalysis } from '../types';
import { translations } from '../translations';
import { Globe, CheckCircle, Calendar, ShoppingBag, Lock, UserPlus, LogIn } from 'lucide-react';

interface ReceiptPreviewProps {
  data: ReceiptAnalysis;
  lang: 'pl' | 'en';
  onUnlock: () => void;
  onLogin: () => void;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ data, lang, onUnlock, onLogin }) => {
  const t = translations[lang].receiptFlow;
  const meta = data.receipt_meta;

  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in">
       <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden relative">
          
          {/* Progress Header */}
          <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
             <div className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                {t.steps.preview}
             </div>
             <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
             </div>
          </div>

          <div className="p-8">
             {/* Status Badge */}
             <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                   <CheckCircle className="w-4 h-4" /> {t.preview.success}
                </div>
             </div>

             {/* Preview Data Card */}
             <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                
                <h2 className="text-2xl font-black text-slate-900 mb-1">{meta.shop_name || "Store"}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
                   {meta.purchase_date}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                   <div className="bg-white p-3 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{t.preview.itemsCount}</div>
                      <div className="text-xl font-black text-slate-800">{data.items.length}</div>
                   </div>
                   <div className="bg-white p-3 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{t.preview.total}</div>
                      <div className="text-xl font-black text-slate-800">
                         {meta.receipt_total?.toFixed(2)} <span className="text-sm">{meta.currency}</span>
                      </div>
                   </div>
                </div>

                {/* Global DB Badge */}
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100 text-left">
                   <div className="w-8 h-8 rounded-full bg-white text-blue-500 flex items-center justify-center shrink-0 shadow-sm">
                      <Globe className="w-4 h-4" />
                   </div>
                   <div>
                      <div className="text-xs font-bold text-blue-800">{t.preview.globalDbBadge}</div>
                      <div className="text-[10px] text-blue-600 leading-tight opacity-80">{t.preview.globalDbDesc}</div>
                   </div>
                </div>
             </div>

             {/* CTA Section */}
             <div className="text-center">
                <h3 className="text-lg font-black text-slate-900 mb-2">{t.preview.ctaTitle}</h3>
                <p className="text-sm text-slate-500 mb-6 px-4">{t.preview.ctaDesc}</p>
                
                <button 
                   onClick={onUnlock}
                   className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 group"
                >
                   <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   {t.preview.unlockButton}
                </button>
                
                <button 
                   onClick={onLogin}
                   className="mt-4 text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors flex items-center justify-center gap-1 mx-auto"
                >
                   <LogIn className="w-3 h-3" /> {t.preview.loginLink}
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ReceiptPreview;
