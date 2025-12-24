
import React from 'react';
import { ReceiptAnalysis, RewardAnalysis } from '../types';
import { Receipt, Calendar, MapPin, AlertTriangle, RefreshCw, Shield, Trophy, Coins, AlertOctagon, Globe } from 'lucide-react';
import { translations } from '../translations'; // Add this import

interface ReceiptResultProps {
  data: ReceiptAnalysis;
  rewardData?: RewardAnalysis | null;
  onClose: () => void;
  lang: 'pl' | 'en'; // Add lang prop
}

const ReceiptResult: React.FC<ReceiptResultProps> = ({ data, rewardData, onClose, lang }) => {
  const meta = data.receipt_meta;
  const t = translations[lang].receiptFlow; // Access new translations

  const qualityColor = meta.ocr_quality === 'high' ? 'text-emerald-600 bg-emerald-50' : meta.ocr_quality === 'medium' ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'partially_accepted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'flagged': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-fade-in border border-slate-200/60">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                   <Receipt className="w-5 h-5" />
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${qualityColor}`}>
                    OCR: {meta.ocr_quality}
                </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{meta.shop_name || "Unknown Store"}</h2>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500 font-medium">
               {meta.purchase_date && (
                   <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {meta.purchase_date}</div>
               )}
               {meta.country && (
                   <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {meta.country}</div>
               )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-900">
             <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* GLOBAL DATABASE BADGE (Translated) */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                    <Globe className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-blue-900 text-sm">{t.preview.globalDbBadge}</h4>
                    <p className="text-xs text-blue-700/80 leading-tight">{t.preview.globalDbDesc}</p>
                </div>
            </div>

            {/* REWARD SECTION */}
            {rewardData && (
              <div className={`p-5 rounded-2xl border ${getStatusColor(rewardData.receipt_status)}`}>
                 <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-black uppercase tracking-widest text-xs mb-1 flex items-center gap-2">
                         <Trophy className="w-4 h-4" /> Receipt Analysis
                      </h3>
                      <div className="text-xl font-black capitalize">{rewardData.receipt_status.replace('_', ' ')}</div>
                    </div>
                    {rewardData.receipt_status === 'accepted' && (
                       <div className="bg-white/60 p-2 rounded-xl text-center min-w-[60px]">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Earned</div>
                          <div className="font-black text-emerald-600 flex items-center justify-center gap-1">
                             +{rewardData.reward.scan_credits_awarded} <Coins className="w-3 h-3" />
                          </div>
                       </div>
                    )}
                 </div>
                 
                 <p className="text-sm font-medium opacity-90 mb-4">{rewardData.reward.reason}</p>
                 
                 {/* Trust Score Impact */}
                 <div className="bg-white/50 rounded-xl p-3 flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> Trust Score Impact</span>
                    <span className={`${rewardData.trust_score_update.new_score >= rewardData.trust_score_update.previous_score ? 'text-emerald-600' : 'text-red-600'}`}>
                       {rewardData.trust_score_update.previous_score.toFixed(2)} → {rewardData.trust_score_update.new_score.toFixed(2)}
                    </span>
                 </div>

                 {/* Fraud Warning */}
                 {rewardData.fraud_analysis.risk_level !== 'low' && (
                    <div className="mt-3 bg-red-50 text-red-700 p-3 rounded-xl border border-red-100 text-xs">
                       <div className="font-bold uppercase flex items-center gap-1 mb-1">
                          <AlertOctagon className="w-3 h-3" /> Risk Detected: {rewardData.fraud_analysis.risk_level}
                       </div>
                       <ul className="list-disc pl-4 space-y-0.5 opacity-90">
                          {rewardData.fraud_analysis.suspicious_patterns.map((pat, i) => (
                             <li key={i}>{pat}</li>
                          ))}
                       </ul>
                    </div>
                 )}
              </div>
            )}
            
            {/* OCR WARNINGS */}
            {data.warnings && data.warnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3" /> OCR Warnings
                    </h4>
                    <ul className="space-y-1">
                        {data.warnings.map((w, i) => (
                            <li key={i} className="text-xs text-amber-800">• {w}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* ITEM LIST */}
            <div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400 px-2 mb-3">
                    <span>{t.result.normalization}</span>
                    <span>Total</span>
                </div>
                
                <div className="space-y-2">
                  {data.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start p-3 hover:bg-slate-50 rounded-xl transition-colors border border-slate-100 group">
                          <div className="flex-1 pr-4">
                              <div className="text-[10px] text-slate-400 mb-0.5 font-mono truncate max-w-[200px]">{item.raw_name}</div>
                              <div className="font-bold text-slate-800 text-sm">{item.normalized_name}</div>
                              
                              <div className="flex flex-wrap gap-2 mt-1">
                                  {item.brand && item.brand !== 'Unknown' && (
                                    <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">{item.brand}</span>
                                  )}
                                  <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold uppercase">{item.category}</span>
                              </div>

                              <div className="text-[10px] text-slate-500 mt-1 font-medium">
                                  {item.quantity} x {item.unit_price.toFixed(2)}
                              </div>
                          </div>
                          <div className="font-mono font-bold text-slate-900">
                              {item.total_price?.toFixed(2) || "-"}
                          </div>
                      </div>
                  ))}
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Receipt Total</span>
                <span className="text-3xl font-black text-slate-900">
                    {meta.receipt_total?.toFixed(2)} <span className="text-lg text-slate-400">{meta.currency}</span>
                </span>
            </div>
            
            <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg">
                {t.result.scanNext}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptResult;
