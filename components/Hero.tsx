
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
  
  // States for different flows
  const [isProcessing, setIsProcessing] = useState(false); // Generic local processing state
  const [isListening, setIsListening] = useState(false);
  
  // Barcode Specific State
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
    if (!SpeechRecognition) {
        alert("Voice search not supported in this browser.");
        return;
    }

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
        recognitionRef.current.onerror = (e: any) => {
            console.warn("Speech error", e);
            setIsListening(false);
        };
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
        
        // --- MASTER FLOW: BARCODE -> OCR FALLBACK ---
        if (scanMode === 'barcode') {
           setIsProcessing(true);
           setBarcodeResult(null); 
           setFallbackTriggered(false);
           
           // 1. Try Barcode Lookup (Fast)
           const result = await barcodeService.identifyProductFromImage(imageData);
           
           if (result.found && result.productName) {
               // Success: Barcode found
               setBarcodeResult(result);
               setInput(result.productName); 
               setIsProcessing(false);
           } else {
               // SILENT FALLBACK: Barcode failed -> Switch to Visual AI immediately
               setFallbackTriggered(true);
               // Do NOT show error. Switch mode and analyze.
               setTimeout(() => {
                   onAnalyze("Visual Product Analysis", imageData, 'product');
               }, 500);
           }
           return; 
        } 
        
        // --- RECEIPT PIPELINE ---
        if (scanMode === 'receipt') {
           onAnalyze("Analyze Receipt", imageData, 'receipt');
           return;
        } 
        
        // --- STANDARD PRODUCT IMAGE ---
        if (file.type !== 'application/pdf') {
             // If manual upload, just analyze immediately
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
  const isPdf = selectedImage?.mimeType === 'application/pdf';

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[40rem] h-[40rem] bg-emerald-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[30rem] h-[30rem] bg-blue-50/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
          {t.title1}<br />
          <span className="text-emerald-600">{t.title2}</span>
        </h1>
        
        <div className="flex justify-center mb-8">
          <button onClick={() => onNavigate('blog')} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-emerald-100 rounded-full pl-3 pr-4 py-2 shadow-sm animate-fade-in group hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <div className="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
               <Lightbulb className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            </div>
            <div className="text-xs md:text-sm font-medium text-slate-700 text-left overflow-hidden h-5 md:h-6 w-full max-w-[250px] md:max-w-md relative flex items-center">
               <div key={currentTipIndex} className="animate-[fade-in_0.5s_ease-out] whitespace-nowrap overflow-hidden text-ellipsis flex items-center w-full">
                  <span className="font-bold text-emerald-700 mr-2 shrink-0">CheckIn Tip:</span> 
                  <span className="truncate">{blogFacts[currentTipIndex].desc}</span>
               </div>
            </div>
            <div className="pl-2 border-l border-slate-200/50 text-slate-400 group-hover:text-emerald-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-12">
          
          {selectedImage && (
            <div className="mb-8 relative inline-block group animate-fade-in">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full -z-10 scale-110"></div>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-slate-100 w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                {isPdf ? (
                    <div className="flex flex-col items-center justify-center text-slate-500">
                        <FileText className="w-16 h-16 mb-2 text-red-500" />
                        <span className="text-xs font-bold uppercase tracking-widest">PDF Document</span>
                    </div>
                ) : (
                    <img 
                      src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} 
                      alt="Selected product" 
                      className={`w-full h-full object-cover transition-all duration-500 ${isProcessing || scanMode === 'receipt' ? 'brightness-50 grayscale-[0.5]' : 'hover:scale-[1.02]'}`}
                    />
                )}
                
                {!isProcessing && !isLoading && !fallbackTriggered && (
                  <button type="button" onClick={clearImage} className="absolute top-2 right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-2xl hover:bg-red-600 transition-all transform hover:scale-110 active:scale-95 group/btn z-20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                
                {/* Overlays */}
                {(isProcessing || isLoading || fallbackTriggered) && (
                  <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
                      <div className="bg-slate-900/80 text-white px-6 py-3 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider scale-90 md:scale-100 shadow-2xl">
                          <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                          {fallbackTriggered ? t.barcode.notFound : (scanMode === 'receipt' ? 'Processing Receipt...' : t.extracting)}
                      </div>
                  </div>
                )}
              </div>
              
              {/* Status Badge */}
              <div className="mt-4 flex flex-col items-center gap-1">
                {!isProcessing && !isLoading && !fallbackTriggered && barcodeResult && (
                   <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm flex items-center gap-2 bg-emerald-100 text-emerald-700`}>
                      <CheckCircle className="w-3 h-3" /> {t.barcode.found}
                   </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-stretch bg-white rounded-[2rem] shadow-2xl shadow-slate-200/80 border border-slate-200 p-2 overflow-hidden focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-300">
            <div className="flex flex-1 items-center pl-4 relative">
              <Search className={`w-5 h-5 transition-colors ${isListening ? 'text-red-500' : 'text-slate-400'} mr-3`} />
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? t.listening : (scanMode === 'barcode' ? t.barcode.hints : scanMode === 'receipt' ? "Scanning receipt/PDF..." : t.placeholder)}
                className="flex-1 py-4 text-slate-900 placeholder:text-slate-400 outline-none bg-transparent text-base md:text-lg resize-none max-h-48 min-h-[3.5rem] leading-relaxed"
                disabled={isLoading || isProcessing || scanMode === 'receipt'}
                rows={input.includes('\n') ? 3 : 1}
              />
            </div>
            
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
            
            <div className="flex items-center justify-end border-t md:border-t-0 md:border-l border-slate-100 mt-2 md:mt-0 pt-2 md:pt-0 pl-2 gap-1">
              <button 
                type="button"
                onClick={toggleVoiceSearch}
                className={`relative p-4 transition-all rounded-2xl ${isListening ? 'text-red-600 bg-red-50 animate-pulse-red' : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-50'}`}
                title="Voice Search"
                disabled={scanMode === 'receipt'}
              >
                {isListening ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button 
                 type="button"
                 onClick={() => openCamera('barcode')}
                 className={`p-4 transition-all rounded-2xl ${scanMode === 'barcode' ? 'bg-blue-50 text-blue-600 shadow-inner' : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-50'}`}
                 title="Scan Barcode"
              >
                 <ScanBarcode className="w-5 h-5" />
              </button>

              <button 
                type="button"
                disabled={isProcessing}
                onClick={() => {
                   setScanMode('product');
                   if (fileInputRef.current) {
                    fileInputRef.current.removeAttribute('capture');
                    fileInputRef.current.click();
                  }
                }}
                className={`p-4 transition-all rounded-2xl ${isProcessing ? 'opacity-50 cursor-not-allowed' : (selectedImage && scanMode === 'product' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-50')}`}
                title="Upload/Scan Product"
              >
                <Upload className="w-5 h-5" />
              </button>

              <button 
                type="submit"
                disabled={!canAnalyze && scanMode !== 'receipt'}
                className={`flex items-center px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ml-2 shadow-lg min-w-[180px] justify-center ${
                  (canAnalyze || (scanMode === 'receipt' && selectedImage)) && !isLoading
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-500/30 hover:-translate-y-1 active:translate-y-0' 
                  : (isLoading ? 'bg-emerald-600/90 text-white cursor-wait' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none')
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3 animate-text-pulse">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <Settings className="w-4 h-4 animate-gear absolute -top-1 -left-1 opacity-80" />
                      <Settings className="w-5 h-5 animate-gear-reverse" />
                    </div>
                    {t.analyzing}
                  </div>
                ) : (
                    scanMode === 'barcode' && barcodeResult
                        ? t.barcode.analyzeCta 
                        : t.analyze
                )}
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-10 text-xs text-slate-400 font-bold uppercase tracking-widest">
            <button 
              type="button" 
              disabled={isProcessing}
              onClick={() => openCamera('barcode')}
              className={`flex items-center gap-2 transition-colors ${scanMode === 'barcode' ? 'text-blue-600 font-black' : 'text-emerald-600/80 hover:text-emerald-600'}`}
            >
              <ScanBarcode className="w-4 h-4" /> {t.barcode.scan}
            </button>
            <button 
              type="button" 
              disabled={isProcessing}
              onClick={() => openCamera('receipt')} 
              className={`flex items-center gap-2 transition-colors ${scanMode === 'receipt' ? 'text-blue-600 font-black' : 'text-emerald-600/80 hover:text-emerald-600'}`}
            >
              <Receipt className="w-4 h-4" /> {tSticky.scan}
            </button>
          </div>
        </form>
        
        {/* Footer Tags */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto opacity-60 mt-16">
          <div className="bg-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 shadow-sm">{t.tags.global}</div>
          <div className="bg-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 shadow-sm">{t.tags.scores}</div>
          <div className="bg-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 shadow-sm">{t.tags.prices}</div>
          <div className="bg-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 shadow-sm">{t.tags.independent}</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
