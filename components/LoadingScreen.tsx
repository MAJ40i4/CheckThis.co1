
import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Loader2, Share2, Lightbulb, Heart, Zap, AlertTriangle, ShoppingCart, Info, Brain, ScanLine, Database } from 'lucide-react';

interface LoadingScreenProps {
  lang: 'pl' | 'en';
  mode?: 'product' | 'receipt';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ lang, mode = 'product' }) => {
  const t = translations[lang];
  const tLoading = t.loading;
  const tReceipt = t.receiptFlow;
  
  const [progress, setProgress] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [isShareTooltipVisible, setIsShareTooltipVisible] = useState(false);

  // 1. Non-linear Progress Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Receipt Flow: 0-65% (Step 1 & 2)
        if (mode === 'receipt') {
             if (prev < 25) return prev + 1.0; // OCR phase
             if (prev < 65) return prev + 0.5; // Normalization phase
             return prev; // Stall at 65% until preview loads
        }
        // Product Flow: 0-95%
        if (prev < 60) return prev + 1.5; 
        if (prev < 85) return prev + 0.4;
        if (prev < 92) return prev + 0.1; 
        return prev; 
      });
    }, 100);
    return () => clearInterval(interval);
  }, [mode]);

  // 2. Rotating Tips (10s)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tLoading.tips.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [tLoading.tips.length]);

  // 3. Rotating Status (3s)
  useEffect(() => {
     // Different status pool for receipt vs product
    const statuses = mode === 'receipt' 
        ? [...tReceipt.loading.ocr, ...tReceipt.loading.analysis]
        : tLoading.statuses;
        
    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mode, tLoading.statuses, tReceipt.loading.ocr, tReceipt.loading.analysis]);

  const currentTip = tLoading.tips[currentTipIndex];

  // Visual Generation Logic
  const getTipVisuals = (category: string) => {
    switch (category) {
      case 'food': return { icon: Heart, bg: 'bg-emerald-500', text: 'text-white' };
      case 'warning': return { icon: AlertTriangle, bg: 'bg-amber-500', text: 'text-white' };
      case 'shopping': return { icon: ShoppingCart, bg: 'bg-blue-500', text: 'text-white' };
      case 'habit': return { icon: Zap, bg: 'bg-purple-500', text: 'text-white' };
      case 'science': return { icon: Brain, bg: 'bg-indigo-500', text: 'text-white' };
      default: return { icon: Lightbulb, bg: 'bg-slate-800', text: 'text-white' };
    }
  };

  const visuals = getTipVisuals(currentTip.category);
  const Icon = visuals.icon;

  const handleShare = async () => {
    const shareData = {
      title: 'CheckThis Tip',
      text: `${currentTip.title}: ${currentTip.desc}\n\n${tLoading.shareCopy} https://checkthis.co`,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log('Share canceled'); }
    } else {
      navigator.clipboard.writeText(shareData.text);
      setIsShareTooltipVisible(true);
      setTimeout(() => setIsShareTooltipVisible(false), 2000);
    }
  };
  
  // Status Text Logic
  const getStatusText = () => {
      if (mode === 'receipt') {
          if (progress < 25) return tReceipt.loading.ocr[currentStatusIndex % tReceipt.loading.ocr.length];
          return tReceipt.loading.analysis[currentStatusIndex % tReceipt.loading.analysis.length];
      }
      return tLoading.statuses[currentStatusIndex];
  };

  const getStepTitle = () => {
      if (mode === 'receipt') {
          if (progress < 25) return tReceipt.steps.ocr;
          return tReceipt.steps.analysis;
      }
      return tLoading.title;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6">
      <div className="max-w-md w-full relative">
        
        {/* Progress Section */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-emerald-600 font-bold uppercase tracking-widest text-xs animate-pulse">
            {mode === 'receipt' ? <ScanLine className="w-4 h-4 animate-spin" /> : <Loader2 className="w-4 h-4 animate-spin" />}
            {getStepTitle()}
          </div>
          
          <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          <p className="text-slate-400 text-sm h-6 transition-all duration-500 fade-in-out font-medium">
             {getStatusText()}
          </p>
        </div>

        {/* Viral Tip Card */}
        <div className="bg-white rounded-3xl p-1 shadow-2xl shadow-slate-200/50 border border-slate-100 transform transition-all duration-700 hover:scale-[1.02]">
           <div className="bg-slate-50 rounded-[1.4rem] p-6 relative overflow-hidden group">
              {/* Background Decoration */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 ${visuals.bg}`}></div>
              <div className={`absolute bottom-0 left-0 w-full h-1 opacity-20 ${visuals.bg}`}></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${visuals.bg} ${visuals.text}`}>
                    <Icon className="w-5 h-5" />
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
                    {tLoading.didYouKnow}
                 </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">
                 {currentTip.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                 {currentTip.desc}
              </p>

              <button 
                onClick={handleShare}
                className="w-full py-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-md transition-all active:scale-95 group/btn"
              >
                <Share2 className="w-4 h-4 transition-transform group-hover/btn:-rotate-12" /> 
                {isShareTooltipVisible ? "Copied to Clipboard!" : tLoading.share}
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;
