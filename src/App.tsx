
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnalysisResult from './components/AnalysisResult';
import ReceiptResult from './components/ReceiptResult';
import ReceiptPreview from './components/ReceiptPreview';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CheckInBlog from './components/CheckInBlog';
import BusinessAPI from './components/BusinessAPI';
import Pricing from './components/Pricing';
import CheckoutModal from './components/CheckoutModal';
import Ethics from './components/Ethics';
import Footer from './components/Footer';
import SmartBasket from './components/SmartBasket';
import LoadingScreen from './components/LoadingScreen'; 
import { ProductAnalysis, ReceiptAnalysis, UserPersona, BasketItem, StoreOffer, SearchMatch, Currency, PlanTier, UserState, RewardAnalysis } from './types';
import { analyzeProduct, analyzeReceipt, evaluateReceiptRewards } from './services/geminiService';
import { authService } from './services/authService';
import { priceService } from './services/priceService';
import { Settings, ScanLine, Link, Lock, UserPlus, Camera } from 'lucide-react';
import { translations } from './translations';

// Sticky Mobile Nav with Premium styling
const StickyMobileNav = ({ onScan, onLink, lang }: { onScan: () => void, onLink: () => void, lang: 'pl' | 'en' }) => (
  <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 z-40 md:hidden flex gap-3 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none">
     <div className="flex w-full gap-3 pointer-events-auto">
       <button onClick={onLink} className="flex-1 glass-dark text-white py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-all" style={{ backgroundColor: '#0f172a' }}>
          <Link className="w-4 h-4" /> {translations[lang].stickyNav.paste}
       </button>
       <button onClick={onScan} className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Camera className="w-4 h-4" /> {translations[lang].stickyNav.scan}
       </button>
     </div>
  </div>
);

type View = 'home' | 'blog';

const App: React.FC = () => {
  const [lang, setLang] = useState<'pl' | 'en'>('pl');
  const [currency, setCurrency] = useState<Currency>('PLN');
  const [user, setUser] = useState<UserState>(() => authService.initSession());
  const [currentView, setCurrentView] = useState<View>('home');
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [pendingReceiptAnalysis, setPendingReceiptAnalysis] = useState<ReceiptAnalysis | null>(null);
  const [receiptAnalysis, setReceiptAnalysis] = useState<ReceiptAnalysis | null>(null);
  const [rewardAnalysis, setRewardAnalysis] = useState<RewardAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<'product' | 'receipt'>('product');
  const [persona, setPersona] = useState<UserPersona>(UserPersona.GENERAL);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [userImage, setUserImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('PERSONAL');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Warsaw')) { setCurrency('PLN'); setLang('pl'); }
    else if (tz.includes('Berlin') || tz.includes('Paris')) { setCurrency('EUR'); setLang('en'); }
    else if (tz.includes('New_York')) { setCurrency('USD'); setLang('en'); }
  }, []);

  useEffect(() => {
    const savedBasket = localStorage.getItem('checkthis_basket');
    if (savedBasket) try { setBasket(JSON.parse(savedBasket)); } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { localStorage.setItem('checkthis_basket', JSON.stringify(basket)); }, [basket]);

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = async (input: string, imageData?: { data: string; mimeType: string }, type: 'product' | 'receipt' = 'product') => {
    setIsLoading(true);
    setLoadingMode(type);
    if (imageData) setUserImage(imageData); else setUserImage(null);
    if (currentView !== 'home') setCurrentView('home');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (type === 'receipt' && imageData) {
        const result = await analyzeReceipt(imageData, lang === 'pl' ? 'PL' : 'US');
        setPendingReceiptAnalysis(result);
        setShowReceiptPreview(true); 
        setIsLoading(false);
      } else {
        const imagePart = imageData ? { inlineData: { data: imageData.data, mimeType: imageData.mimeType } } : undefined;
        const result = await analyzeProduct(input || "Product", persona, lang, imagePart);
        setAnalysis(result);
        setReceiptAnalysis(null); 
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleUnlockReceipt = () => {
      if (!pendingReceiptAnalysis) return;
      if (!user.isLoggedIn) { setShowReceiptPreview(false); setIsOnboardingModalOpen(true); return; }
      if (user.plan === 'FREE' && user.free_receipt_scans <= 0) { setShowReceiptPreview(false); setIsPaywallModalOpen(true); return; }
      setShowReceiptPreview(false);
      processValidReceipt(pendingReceiptAnalysis, user);
  };

  const processValidReceipt = async (result: ReceiptAnalysis, currentUser: UserState) => {
      priceService.savePrices(result);
      const fingerprint = btoa(`${result.receipt_meta.shop_name}-${result.receipt_meta.total_amount}`);
      const rewardResult = await evaluateReceiptRewards(result, currentUser, fingerprint);
      setReceiptAnalysis(result);
      setRewardAnalysis(rewardResult);
      setPendingReceiptAnalysis(null);
      const updatedUser = { ...currentUser, free_receipt_scans: currentUser.plan === 'FREE' ? currentUser.free_receipt_scans - 1 : currentUser.free_receipt_scans };
      setUser(updatedUser);
      authService.persistSession(updatedUser);
  };

  const openCheckout = (plan: PlanTier, price: string) => {
    if (plan === 'FREE') return; 
    setSelectedPlan(plan); setSelectedPrice(price); setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = (updatedUser: UserState) => {
    setIsCheckoutOpen(false); setIsPaywallModalOpen(false); setUser(updatedUser); 
    if (pendingReceiptAnalysis) processValidReceipt(pendingReceiptAnalysis, updatedUser);
  };

  const handleLoginSuccess = (updatedUser: UserState) => {
      setIsOnboardingModalOpen(false); setUser(updatedUser);
      if (pendingReceiptAnalysis) {
          if (updatedUser.plan === 'FREE' && updatedUser.free_receipt_scans <= 0) setIsPaywallModalOpen(true);
          else processValidReceipt(pendingReceiptAnalysis, updatedUser);
      }
  };

  const handleAddToBasket = (offer: StoreOffer, productName: string) => {
    const newItem: BasketItem = {
      id: Math.random().toString(36).substr(2, 9),
      productName,
      offer,
      timestamp: Date.now(),
    };
    setBasket((prev) => [...prev, newItem]);
    setIsBasketOpen(true);
  };

  const handleSelectMatch = (match: SearchMatch) => {
    handleAnalyze(`${match.brand} ${match.name}`, undefined, 'product');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        basketCount={basket.length} 
        onOpenBasket={() => setIsBasketOpen(true)} 
        onNavigate={handleNavigate} 
        currentView={currentView}
        onLogin={() => setIsOnboardingModalOpen(true)}
      />
      
      <main className="pb-32 md:pb-0">
        {currentView === 'home' ? (
          <>
            <div className="relative">
              <div className="absolute top-24 right-4 md:right-12 z-20">
                <button onClick={() => setShowPersonaMenu(!showPersonaMenu)} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-[10px] font-bold shadow-sm text-slate-600">
                  <Settings className="w-3 h-3" />
                  {translations[lang].personas.title} <span className="text-emerald-600 uppercase">{persona.split(' ')[0]}</span>
                </button>
                {showPersonaMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-30">
                    {Object.values(UserPersona).map((p) => (
                      <button key={p} onClick={() => { setPersona(p); setShowPersonaMenu(false); }} className={`w-full text-left px-4 py-2 text-xs font-medium rounded-xl ${persona === p ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-slate-50 text-slate-600'}`}>{p}</button>
                    ))}
                  </div>
                )}
              </div>
              <Hero onAnalyze={handleAnalyze} isLoading={isLoading} lang={lang} onNavigate={handleNavigate} />
            </div>
            
            {receiptAnalysis && <ReceiptResult data={receiptAnalysis} rewardData={rewardAnalysis} onClose={() => { setReceiptAnalysis(null); setRewardAnalysis(null); scrollToTop(); }} lang={lang} />}

            {analysis && (
              <AnalysisResult data={analysis} persona={persona} onReset={() => { setAnalysis(null); scrollToTop(); }} lang={lang} onAddToBasket={handleAddToBasket} basket={basket} onSelectMatch={handleSelectMatch} userImage={userImage} onAnalyze={(input) => handleAnalyze(input, undefined, 'product')} userPlan={user.plan} onUnlock={() => openCheckout('PERSONAL', '14,99 zł')} />
            )}
            
            {/* Always show informational sections below, even with results */}
            <HowItWorks lang={lang} />
            <Features lang={lang} />
            <BusinessAPI lang={lang} />
            <Ethics />
            <Pricing lang={lang} currency={currency} setCurrency={setCurrency} onSelectPlan={openCheckout} currentPlan={user.plan} />
          </>
        ) : (
          <div className="pt-20"><CheckInBlog lang={lang} /></div>
        )}
      </main>

      <Footer lang={lang} />

      {!isLoading && currentView === 'home' && <StickyMobileNav onScan={scrollToTop} onLink={scrollToTop} lang={lang} />}

      <SmartBasket isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} basket={basket} onRemove={(id) => setBasket(prev => prev.filter(i => i.id !== id))} onClear={() => setBasket([])} lang={lang} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} plan={selectedPlan} price={selectedPrice} currency={currency} lang={lang} onSuccess={handleCheckoutSuccess} />
      {showReceiptPreview && pendingReceiptAnalysis && <ReceiptPreview data={pendingReceiptAnalysis} lang={lang} onUnlock={handleUnlockReceipt} onLogin={() => { setShowReceiptPreview(false); setIsOnboardingModalOpen(true); }} />}
      <CheckoutModal isOpen={isOnboardingModalOpen} onClose={() => setIsOnboardingModalOpen(false)} plan={'FREE'} price={'0.00'} currency={currency} lang={lang} onSuccess={handleLoginSuccess} />
      <CheckoutModal isOpen={isPaywallModalOpen} onClose={() => setIsPaywallModalOpen(false)} plan={'PERSONAL'} price={currency === 'PLN' ? '14,99 zł' : '4.99 $'} currency={currency} lang={lang} onSuccess={handleCheckoutSuccess} />
      {isLoading && <LoadingScreen lang={lang} mode={loadingMode} />}
    </div>
  );
};

export default App;
