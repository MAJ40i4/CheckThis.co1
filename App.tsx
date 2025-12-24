
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnalysisResult from './components/AnalysisResult';
import ReceiptResult from './components/ReceiptResult';
import ReceiptPreview from './components/ReceiptPreview'; // New Import
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
import { Settings, ScanLine, Link, Lock, UserPlus } from 'lucide-react';
import { translations } from './translations';

// Sticky Mobile Nav Component
const StickyMobileNav = ({ onScan, onLink, lang }: { onScan: () => void, onLink: () => void, lang: 'pl' | 'en' }) => (
  <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden flex gap-3">
     <button onClick={onLink} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl shadow-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95">
        <Link className="w-4 h-4" /> {translations[lang].stickyNav.paste}
     </button>
     <button onClick={onScan} className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl shadow-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all active:scale-95">
        <ScanLine className="w-4 h-4" /> {translations[lang].stickyNav.scan}
     </button>
  </div>
);

type View = 'home' | 'blog';

const App: React.FC = () => {
  const [lang, setLang] = useState<'pl' | 'en'>('pl');
  const [currency, setCurrency] = useState<Currency>('PLN');
  
  // Initial Auth State Load
  const [user, setUser] = useState<UserState>(() => authService.initSession());

  const [currentView, setCurrentView] = useState<View>('home');
  
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  
  // Pending receipt data (waiting for login/unlock)
  const [pendingReceiptAnalysis, setPendingReceiptAnalysis] = useState<ReceiptAnalysis | null>(null);
  // Displayed receipt data (unlocked)
  const [receiptAnalysis, setReceiptAnalysis] = useState<ReceiptAnalysis | null>(null);
  
  const [rewardAnalysis, setRewardAnalysis] = useState<RewardAnalysis | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<'product' | 'receipt'>('product'); // New state for specific loading visuals

  const [persona, setPersona] = useState<UserPersona>(UserPersona.GENERAL);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [userImage, setUserImage] = useState<{ data: string; mimeType: string } | null>(null);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('PERSONAL');
  const [selectedPrice, setSelectedPrice] = useState('');

  // Onboarding / Paywall State
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false); // Step 3 Preview State

  const t = translations[lang];

  // Auto-detect currency/region
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Warsaw')) {
       setCurrency('PLN');
       setLang('pl');
    } else if (tz.includes('Berlin') || tz.includes('Paris') || tz.includes('Madrid')) {
       setCurrency('EUR');
       setLang('en');
    } else if (tz.includes('New_York') || tz.includes('Los_Angeles')) {
       setCurrency('USD');
       setLang('en');
    }
  }, []);

  useEffect(() => {
    const savedBasket = localStorage.getItem('checkthis_basket');
    if (savedBasket) {
      try { setBasket(JSON.parse(savedBasket)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkthis_basket', JSON.stringify(basket));
  }, [basket]);

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
        // 1. Analyze Receipt content (Steps 1 & 2 via LoadingScreen)
        const result = await analyzeReceipt(imageData, lang === 'pl' ? 'PL' : 'US');
        
        // 2. STOP LOADING & SHOW PREVIEW (Step 3)
        // We do NOT check auth yet. We show the value first.
        setPendingReceiptAnalysis(result);
        setShowReceiptPreview(true); 
        setIsLoading(false);

      } else {
        const imagePart = imageData ? { inlineData: { data: imageData.data, mimeType: imageData.mimeType } } : undefined;
        const result = await analyzeProduct(input || "Product", persona, lang, imagePart);
        setAnalysis(result);
        setReceiptAnalysis(null); 
        setRewardAnalysis(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleUnlockReceipt = () => {
      // Step 4: Account/Gate Logic
      // Triggered when user clicks "Create Account / View Result" in Preview
      
      if (!pendingReceiptAnalysis) return;

      if (!user.isLoggedIn) {
          setShowReceiptPreview(false); // Hide preview
          setIsOnboardingModalOpen(true); // Show Login/Register
          return;
      }

      // If logged in, check quota
      if (user.plan === 'FREE' && user.free_receipt_scans <= 0) {
          setShowReceiptPreview(false);
          setIsPaywallModalOpen(true);
          return;
      }

      // If OK, process
      setShowReceiptPreview(false);
      processValidReceipt(pendingReceiptAnalysis, user);
  };

  const handleOpenLogin = () => {
      setShowReceiptPreview(false);
      setIsOnboardingModalOpen(true);
  };

  const processValidReceipt = async (result: ReceiptAnalysis, currentUser: UserState) => {
      // Save Prices to Global DB
      priceService.savePrices(result);

      // Evaluate Rewards
      const fingerprint = btoa(`${result.receipt_meta.shop_name}-${result.receipt_meta.total_amount}-${result.receipt_meta.purchase_date}`);
      const rewardResult = await evaluateReceiptRewards(result, currentUser, fingerprint);
      
      setReceiptAnalysis(result);
      setRewardAnalysis(rewardResult);
      setPendingReceiptAnalysis(null);

      // Update User State (Decrement Scans)
      const updatedUser = { 
        ...currentUser,
        free_receipt_scans: currentUser.plan === 'FREE' ? currentUser.free_receipt_scans - 1 : currentUser.free_receipt_scans,
        scanCredits: currentUser.scanCredits + rewardResult.reward.scan_credits_awarded,
        pricePoints: currentUser.pricePoints + rewardResult.reward.price_points_awarded,
        trustScore: rewardResult.trust_score_update.new_score,
        scanHistory: {
          ...currentUser.scanHistory,
          total: currentUser.scanHistory.total + 1,
          accepted: currentUser.scanHistory.accepted + (rewardResult.receipt_status === 'accepted' ? 1 : 0),
          rejected: currentUser.scanHistory.rejected + (rewardResult.receipt_status === 'rejected' ? 1 : 0),
          fraud: currentUser.scanHistory.fraud + (rewardResult.receipt_status === 'flagged' ? 1 : 0)
        }
      };
      
      setUser(updatedUser);
      authService.persistSession(updatedUser);
  };

  const handleSelectMatch = (match: SearchMatch) => handleAnalyze(`${match.brand} ${match.name}`, undefined, 'product');
  
  const handleAddToBasket = (offer: StoreOffer, productName: string) => {
    setBasket(prev => [...prev, { id: `${Date.now()}`, productName, offer, timestamp: Date.now() }]);
  };

  const openCheckout = (plan: PlanTier, price: string) => {
    if (plan === 'FREE') return; 
    if (plan === 'PRO') {
       window.location.href = "mailto:sales@checkthis.co";
       return;
    }
    setSelectedPlan(plan);
    setSelectedPrice(price);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = (updatedUser: UserState) => {
    setIsCheckoutOpen(false);
    setIsPaywallModalOpen(false);
    setUser(updatedUser); 
    
    // If there was a pending receipt blocked by paywall, show it now
    if (pendingReceiptAnalysis) {
        processValidReceipt(pendingReceiptAnalysis, updatedUser);
    }
  };

  const handleLoginSuccess = (updatedUser: UserState) => {
      setIsOnboardingModalOpen(false);
      setUser(updatedUser);

      // If there was a pending receipt blocked by login, check quota and show
      if (pendingReceiptAnalysis) {
          if (updatedUser.plan === 'FREE' && updatedUser.free_receipt_scans <= 0) {
              setIsPaywallModalOpen(true);
          } else {
              processValidReceipt(pendingReceiptAnalysis, updatedUser);
          }
      }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-slate-50">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        basketCount={basket.length} 
        onOpenBasket={() => setIsBasketOpen(true)}
        onNavigate={handleNavigate}
        currentView={currentView}
      />
      
      <main>
        {currentView === 'home' ? (
          <>
            <div className="relative">
              {/* Persona Switcher */}
              <div className="absolute top-24 right-4 md:right-12 z-20">
                <button 
                  onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-bold shadow-sm hover:shadow-md transition-all text-slate-600"
                >
                  <Settings className="w-3.5 h-3.5" />
                  {t.personas.title} <span className="text-emerald-600 uppercase tracking-wider">{persona.split(' ')[0]}</span>
                </button>
                {showPersonaMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-30">
                    {Object.values(UserPersona).map((p) => (
                      <button
                        key={p}
                        onClick={() => { setPersona(p); setShowPersonaMenu(false); }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium rounded-xl transition-colors ${persona === p ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-slate-50 text-slate-600'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Hero onAnalyze={handleAnalyze} isLoading={isLoading} lang={lang} onNavigate={handleNavigate} />
            </div>
            
            {/* FINAL RECEIPT RESULTS */}
            {receiptAnalysis && (
                <ReceiptResult 
                    data={receiptAnalysis} 
                    rewardData={rewardAnalysis}
                    onClose={() => { setReceiptAnalysis(null); setRewardAnalysis(null); scrollToTop(); }} 
                    lang={lang}
                />
            )}

            {/* PRODUCT ANALYSIS RESULTS */}
            {analysis ? (
              <AnalysisResult 
                data={analysis} 
                persona={persona} 
                onReset={() => { setAnalysis(null); scrollToTop(); }}
                lang={lang}
                onAddToBasket={handleAddToBasket}
                basket={basket}
                onSelectMatch={handleSelectMatch}
                userImage={userImage}
                onAnalyze={(input) => handleAnalyze(input, undefined, 'product')} 
                userPlan={user.plan}
                onUnlock={() => {
                  if (user.isLoggedIn && user.plan !== 'FREE') {
                     alert("You already have a premium plan!");
                  } else {
                     openCheckout('PERSONAL', currency === 'PLN' ? '14,99 zł' : currency === 'EUR' ? '3.99 €' : '4.99 $');
                  }
                }}
              />
            ) : (
              !receiptAnalysis && !showReceiptPreview && (
                <>
                    <HowItWorks lang={lang} />
                    <Features lang={lang} />
                </>
              )
            )}
            
            <BusinessAPI lang={lang} />
            <Ethics />
            <Pricing 
              lang={lang} 
              currency={currency} 
              setCurrency={setCurrency}
              onSelectPlan={openCheckout}
              currentPlan={user.plan}
            />
          </>
        ) : (
          /* Blog View */
          <div className="pt-20">
             <CheckInBlog lang={lang} />
             <div className="py-12 bg-slate-50 text-center">
                <button onClick={() => handleNavigate('home')} className="text-emerald-600 font-bold hover:underline">
                   Back to Home
                </button>
             </div>
          </div>
        )}
      </main>

      <Footer lang={lang} />

      {!isLoading && currentView === 'home' && <StickyMobileNav onScan={scrollToTop} onLink={scrollToTop} lang={lang} />}

      <SmartBasket 
        isOpen={isBasketOpen} 
        onClose={() => setIsBasketOpen(false)}
        basket={basket}
        onRemove={(id) => setBasket(prev => prev.filter(i => i.id !== id))}
        onClear={() => setBasket([])}
        lang={lang}
      />

      {/* Main Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        plan={selectedPlan}
        price={selectedPrice}
        currency={currency}
        lang={lang}
        onSuccess={handleCheckoutSuccess}
      />

      {/* STEP 3: RECEIPT PREVIEW MODAL */}
      {showReceiptPreview && pendingReceiptAnalysis && (
          <ReceiptPreview 
              data={pendingReceiptAnalysis}
              lang={lang}
              onUnlock={handleUnlockReceipt}
              onLogin={handleOpenLogin}
          />
      )}

      {/* ONBOARDING MODAL (STEP 4) */}
      <CheckoutModal 
         isOpen={isOnboardingModalOpen}
         onClose={() => setIsOnboardingModalOpen(false)}
         plan={'FREE'} 
         price={'0.00'} // Free signup
         currency={currency}
         lang={lang}
         onSuccess={handleLoginSuccess}
      />
      {/* Hack to override title in CheckoutModal for Onboarding context */}
      {isOnboardingModalOpen && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] bg-emerald-600 text-white px-6 py-3 rounded-full shadow-xl font-bold text-sm animate-bounce flex items-center gap-2 w-max">
              <UserPlus className="w-4 h-4" />
              {lang === 'pl' ? "Utwórz konto, aby odebrać 3 darmowe skany!" : "Create account to get 3 free receipt scans!"}
          </div>
      )}

      {/* PAYWALL MODAL (QUOTA EXCEEDED) */}
      <CheckoutModal
         isOpen={isPaywallModalOpen}
         onClose={() => setIsPaywallModalOpen(false)}
         plan={'PERSONAL'}
         price={currency === 'PLN' ? '14,99 zł' : '4.99 $'}
         currency={currency}
         lang={lang}
         onSuccess={handleCheckoutSuccess}
      />
      {isPaywallModalOpen && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl font-bold text-sm flex items-center gap-2 w-max">
              <Lock className="w-4 h-4" />
              {lang === 'pl' ? "Darmowe skany wyczerpane. Odblokuj Pro." : "Free scans used. Unlock Pro."}
          </div>
      )}

      {/* NEW LOADING SCREEN WITH MODES */}
      {isLoading && <LoadingScreen lang={lang} mode={loadingMode} />}
    </div>
  );
};

export default App;
