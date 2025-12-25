
import React, { useState, useRef, useEffect } from 'react';
import { Search, Link as LinkIcon, Camera, Upload, Mic, Loader2, Trash2, StopCircle, Settings, Lightbulb, ChevronRight, ScanBarcode, Sparkles, Tag, Receipt, FileText, CheckCircle, HelpCircle, Eye } from 'lucide-react';
import { translations } from '../translations';
import { extractTextFromImage } from '../services/geminiService';
import { barcodeService, BarcodeResult } from '../services/barcodeService';

interface HeroProps {
  onAnalyze: (input: string, imageData?: { data: string; mimeType: string }, type?: 'product' | 'receipt') => void;
  isLoading: boolean;
  lang: 'pl' | 'en';
  onNavigate: (view: 'home' | 'blog') => void;
}

const Hero: React.FC<HeroProps> = ({ onAnalyze, isLoading, lang, onNavigate }) => {
  const t = translations[lang].hero;
  const tSticky = translations[lang].stickyNav;
  const blogFacts = translations[lang].blog.facts;
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string } | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const [scanMode, setScanMode] = useState<'product' | 'barcode' | 'receipt'>('product');
  const [barcodeResult, setBarcodeResult] = useState<BarcodeResult | null>(null);
  const [fallbackTriggered, setFallbackTriggered] = useState(false);

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % blogFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [blogFacts.length]);

  const toggleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (!recognitionRef.current) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = lang === 'pl' ? 'pl-PL' : 'en-US';

        recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev ? `${prev} ${transcript}` : transcript);
            setIsListening(false);
        };
        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
        recognitionRef.current.start();
        setIsListening(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || selectedImage) {
      if (scanMode === 'receipt' && selectedImage) {
         onAnalyze("Analyze Receipt", selectedImage, 'receipt');
      } else {
         onAnalyze(input, selectedImage || undefined, 'product');
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const imageData = { data: base64String, mimeType: file.type };
        setSelectedImage(imageData);
        
        if (scanMode === 'barcode') {
           setIsProcessing(true);
           setBarcodeResult(null); 
           setFallbackTriggered(false);
           const result = await barcodeService.identifyProductFromImage(imageData);
           if (result.found && result.productName) {
               setBarcodeResult(result);
               setInput(result.productName); 
               setIsProcessing(false);
           } else {
               setFallbackTriggered(true);
               setTimeout(() => {
                   onAnalyze("Visual Product Analysis", imageData, 'product');
               }, 500);
           }
           return; 
        } 
        if (scanMode === 'receipt') {
           onAnalyze("Analyze Receipt", imageData, 'receipt');
           return;
        } 
        if (file.type !== 'application/pdf') {
             onAnalyze("Analyze Product Image", imageData, 'product');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setInput(''); 
    setBarcodeResult(null);
    setFallbackTriggered(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openCamera = (mode: 'product' | 'barcode' | 'receipt') => {
    setScanMode(mode);
    setBarcodeResult(null);
    setInput('');
    setSelectedImage(null);
    setFallbackTriggered(false);

    setTimeout(() => {
        if (fileInputRef.current) {
            if (mode === 'receipt') {
                fileInputRef.current.removeAttribute('capture'); 
            } else {
                fileInputRef.current.setAttribute('capture', 'environment');
            }
            fileInputRef.current.click();
        }
    }, 50);
  };

  const canAnalyze = (input.trim().length > 0 || selectedImage !== null) && !isLoading && !isProcessing;

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[40rem] h-[40rem] bg-emerald-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[30rem] h-[30rem] bg-blue-50/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-3xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 md:mb-6 leading-tight">
          {t.title1}<br />
          <span className="text-emerald-600">{t.title2}</span>
        </h1>
        
        <div className="flex justify-center mb-6 md:mb-8">
          <button onClick={() => onNavigate('blog')} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-emerald-100 rounded-full pl-3 pr-4 py-2 shadow-sm animate-fade-in group hover:bg-white hover:shadow-md transition-all cursor-pointer max-w-[90vw]">
            <div className="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
               <Lightbulb className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            </div>
            <div className="text-xs font-medium text-slate-700 text-left overflow-hidden h-5 w-full relative flex items-center">
               <div key={currentTipIndex} className="animate-[fade-in_0.5s_ease-out] whitespace-nowrap overflow-hidden text-ellipsis flex items-center w-full">
                  <span className="font-bold text-emerald-700 mr-2 shrink-0">Tip:</span> 
                  <span className="truncate">{blogFacts[currentTipIndex].desc}</span>
               </div>
            </div>
            <div className="pl-2 border-l border-slate-200/50 text-slate-400 group-hover:text-emerald-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        <p className="text-base md:text-xl text-slate-600 mb-8 md:mb-10 max-w-2xl mx-auto px-2">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-10">
          {selectedImage && (
            <div className="mb-6 relative inline-block group animate-fade-in">
              <div className="relative overflow-hidden rounded-[2rem] bg-white border-4 border-white shadow-xl ring-1 ring-slate-100 w-32 h-32 md:w-56 md:h-56 flex items-center justify-center">
                <img 
                  src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} 
                  alt="Preview" 
                  className={`w-full h-full object-cover transition-all ${isProcessing ? 'brightness-50' : ''}`}
                />
                {!isProcessing && !isLoading && !fallbackTriggered && (
                  <button type="button" onClick={clearImage} className="absolute top-1 right-1 bg-slate-900/80 text-white p-2 rounded-xl">
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                {(isProcessing || isLoading || fallbackTriggered) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-stretch bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-2 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
            <div className="flex flex-1 items-center pl-4 relative">
              <Search className={`w-5 h-5 transition-colors ${isListening ? 'text-red-500' : 'text-slate-400'} mr-3`} />
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? t.listening : t.placeholder}
                className="flex-1 py-3 text-slate-900 placeholder:text-slate-400 outline-none bg-transparent text-sm md:text-lg resize-none min-h-[3rem] leading-relaxed"
                disabled={isLoading || isProcessing}
                rows={1}
              />
            </div>
            
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
            
            <div className="flex items-center justify-end border-t md:border-t-0 md:border-l border-slate-100 mt-2 md:mt-0 pt-2 md:pt-0 pl-2 gap-1">
              <button type="button" onClick={toggleVoiceSearch} className={`p-4 rounded-2xl ${isListening ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-emerald-600'}`}>
                {isListening ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button 
                type="button" 
                onClick={() => { setScanMode('product'); if (fileInputRef.current) fileInputRef.current.click(); }}
                className="p-4 rounded-2xl text-slate-400 hover:text-emerald-600"
              >
                <Upload className="w-5 h-5" />
              </button>

              <button 
                type="submit"
                disabled={!canAnalyze}
                className={`flex items-center px-8 md:px-10 py-3 md:py-4 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all ml-2 shadow-lg ${
                  canAnalyze && !isLoading ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.analyze}
              </button>
            </div>
          </div>
          
          {/* Quick Actions (Mobile Only visible labels) */}
          <div className="flex justify-center mt-6 gap-6 md:gap-10 text-[10px] font-black uppercase tracking-widest">
            <button type="button" onClick={() => openCamera('barcode')} className="flex items-center gap-2 text-emerald-600/80 hover:text-emerald-600">
              <ScanBarcode className="w-4 h-4" /> {t.barcode.scan}
            </button>
            <button type="button" onClick={() => openCamera('receipt')} className="flex items-center gap-2 text-emerald-600/80 hover:text-emerald-600">
              <Receipt className="w-4 h-4" /> {tSticky.scan}
            </button>
          </div>
        </form>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto opacity-60 mt-8 md:mt-16 px-4">
          <div className="bg-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">{t.tags.global}</div>
          <div className="bg-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">{t.tags.scores}</div>
          <div className="bg-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">{t.tags.prices}</div>
          <div className="bg-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">{t.tags.independent}</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
