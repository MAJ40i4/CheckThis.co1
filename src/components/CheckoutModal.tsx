
import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, CreditCard, Check, Loader2, Apple, AlertCircle, ShieldCheck, Mail, LogOut } from 'lucide-react';
import { Currency, PlanTier, UserState } from '../types';
import { translations } from '../translations';
import { authService } from '../services/authService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanTier;
  price: string;
  currency: Currency;
  lang: 'pl' | 'en';
  onSuccess: (user: UserState) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, plan, price, currency, lang, onSuccess }) => {
  const t = translations[lang].checkout;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Auth State in Modal
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<UserState | null>(null);
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'blik'>('card');
  const [isTestMode, setIsTestMode] = useState(false); // Stripe Test Mode Toggle

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError(null);
      const existing = authService.initSession();
      if (existing.isLoggedIn) {
        setCurrentUser(existing);
        setStep(2); // Skip to payment if logged in
        
        // ADMIN BYPASS: If Admin is logged in, they don't pay
        if (existing.role === 'admin') {
           handleAdminUpgrade(existing);
        }
      }
    }
  }, [isOpen]);

  const handleAdminUpgrade = (adminUser: UserState) => {
      // Simulate instant upgrade for admin
      setTimeout(() => {
        const upgradedUser = { ...adminUser, plan: plan };
        authService.persistSession(upgradedUser);
        onSuccess(upgradedUser);
      }, 500);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const user = await authService.login(email, password);
      setCurrentUser(user);
      authService.persistSession(user);

      if (user.role === 'admin') {
        handleAdminUpgrade(user);
      } else {
        setStep(2);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setLoading(true);
    try {
      const user = await authService.socialLogin(provider);
      setCurrentUser(user);
      authService.persistSession(user);
      setStep(2);
    } catch (e) {
      setError("Social login failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Stripe Processing
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      
      // Upgrade User Plan
      if (currentUser) {
        const upgradedUser = { ...currentUser, plan: plan };
        authService.persistSession(upgradedUser);
        setTimeout(() => {
          onSuccess(upgradedUser);
        }, 2500);
      }
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/60 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* 
         Mobile UX Fix: 
         - min-h-screen ensures the flex container grows with content.
         - py-12 px-4 gives breathing room on mobile.
         - The container is focused on content visibility when keyboard opens.
      */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-[2rem] bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-4xl flex flex-col md:flex-row">
          
          {/* Close Button (Mobile & Desktop) */}
          <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white/50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel - Summary (Sticky on Desktop, Top on Mobile) */}
          <div className="bg-slate-50 p-8 md:w-2/5 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between">
             <div>
                <div className="flex items-center gap-2 mb-6">
                   <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600">
                     <Lock className="w-3 h-3" /> 
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">{t.secure}</span>
                </div>
                
                <div className="mb-8">
                   <div className="text-sm text-slate-500 font-bold mb-1">{t.title}</div>
                   <h2 className="text-3xl font-black text-slate-900 mb-2">{plan === 'PRO' ? 'Pro API' : plan === 'FAMILY' ? 'CheckThis Family' : 'CheckThis Personal'}</h2>
                   <div className="text-4xl font-black text-emerald-600">{price}<span className="text-lg text-slate-400 font-medium">/mo</span></div>
                </div>

                <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check className="w-3 h-3" /></div>
                      {t.cancelAnytime}
                   </li>
                   <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check className="w-3 h-3" /></div>
                      30-day guarantee
                   </li>
                   <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Check className="w-3 h-3" /></div>
                      {t.totalDue}: {price}
                   </li>
                </ul>
             </div>
             
             {/* Trust Footer */}
             <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-4 flex justify-between items-center">
               <span>Powered by <strong>Stripe</strong></span>
               <div className="flex gap-2">
                 <div className="h-4 w-6 bg-slate-200 rounded"></div>
                 <div className="h-4 w-6 bg-slate-200 rounded"></div>
               </div>
             </div>
          </div>

          {/* Right Panel - Steps */}
          <div className="p-8 md:w-3/5 bg-white relative">
             
             {/* Steps Indicator */}
             <div className="flex items-center gap-2 mb-8">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 1 ? 'w-full bg-emerald-500' : 'w-4 bg-slate-200'}`}></div>
                <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? 'w-full bg-emerald-500' : 'w-4 bg-slate-200'}`}></div>
                <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 3 ? 'w-full bg-emerald-500' : 'w-4 bg-slate-200'}`}></div>
             </div>

             {/* STEP 1: AUTHENTICATION */}
             {step === 1 && (
                <div className="animate-fade-in">
                   <h2 className="text-2xl font-black text-slate-900 mb-2">{t.step1}</h2>
                   <p className="text-sm text-slate-500 mb-6">Create an account or sign in to save your analysis history.</p>
                   
                   <div className="grid grid-cols-2 gap-4 mb-6">
                      <button type="button" onClick={() => handleSocialLogin('google')} className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-sm text-slate-600 transition-colors">
                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" /> Google
                      </button>
                      <button type="button" onClick={() => handleSocialLogin('apple')} className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-sm text-slate-600 transition-colors">
                         <Apple className="w-5 h-5" /> Apple
                      </button>
                   </div>
                   
                   <div className="relative mb-6 text-center">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                      <span className="relative bg-white px-2 text-xs text-slate-400 font-bold uppercase">{t.or}</span>
                   </div>

                   <form onSubmit={handleAuthSubmit} className="space-y-4">
                      {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                      )}
                      <div>
                         <label className="block text-xs font-bold uppercase text-slate-500 mb-1">{t.emailLabel}</label>
                         <input 
                           type="email" 
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required 
                           autoComplete="email"
                           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all" 
                           placeholder="name@example.com" 
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-bold uppercase text-slate-500 mb-1">{t.passLabel}</label>
                         <input 
                           type="password" 
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required 
                           autoComplete="current-password"
                           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all" 
                           placeholder="••••••••" 
                         />
                      </div>
                      <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                         {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.createAccount}
                      </button>
                   </form>
                   <div className="mt-4 text-center">
                      <button onClick={() => {setEmail('admin@checkthis.co'); setPassword('admin');}} className="text-[10px] text-slate-300 hover:text-emerald-500 underline">
                        Developer: Use Admin Account
                      </button>
                   </div>
                </div>
             )}

             {/* STEP 2: PAYMENT */}
             {step === 2 && currentUser && (
                <div className="animate-fade-in">
                   <div className="flex justify-between items-center mb-6">
                     <h2 className="text-2xl font-black text-slate-900">{t.step2}</h2>
                     <div className="text-right">
                       <div className="text-xs text-slate-400">Logged in as</div>
                       <div className="text-sm font-bold text-slate-800">{currentUser.email}</div>
                     </div>
                   </div>
                   
                   <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      {currency === 'PLN' && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                           <button 
                             type="button" 
                             onClick={() => setPaymentMethod('card')}
                             className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                           >
                              <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-emerald-600' : 'text-slate-400'}`} />
                              <span className={`text-xs font-bold uppercase ${paymentMethod === 'card' ? 'text-emerald-700' : 'text-slate-500'}`}>{t.card}</span>
                           </button>
                           <button 
                             type="button" 
                             onClick={() => setPaymentMethod('blik')}
                             className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'blik' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                           >
                              <div className="w-8 h-6 bg-slate-200 rounded flex items-center justify-center text-[10px] font-black tracking-widest text-slate-600">BLIK</div>
                              <span className={`text-xs font-bold uppercase ${paymentMethod === 'blik' ? 'text-emerald-700' : 'text-slate-500'}`}>{t.blik}</span>
                           </button>
                        </div>
                      )}

                      {/* Toggle Test Mode */}
                      <div className="flex items-center gap-2 justify-end mb-2">
                         <span className="text-[10px] text-slate-400 uppercase font-bold">Stripe Test Mode</span>
                         <button 
                            type="button" 
                            onClick={() => setIsTestMode(!isTestMode)} 
                            className={`w-8 h-4 rounded-full transition-colors relative ${isTestMode ? 'bg-emerald-500' : 'bg-slate-200'}`}
                         >
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${isTestMode ? 'left-4.5' : 'left-0.5'}`}></div>
                         </button>
                      </div>

                      {paymentMethod === 'card' ? (
                         <div className="space-y-4">
                            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative">
                               {isTestMode && <div className="absolute top-2 right-2 text-[10px] font-mono text-emerald-600 bg-emerald-100 px-1 rounded">TEST CARD</div>}
                               <div className="flex justify-between mb-4">
                                  <div className="text-xs font-bold text-slate-400 uppercase">Card Number</div>
                                  <div className="flex gap-2">
                                     <div className="w-8 h-5 bg-white rounded border border-slate-200"></div>
                                     <div className="w-8 h-5 bg-white rounded border border-slate-200"></div>
                                  </div>
                               </div>
                               <input 
                                  type="text" 
                                  placeholder="0000 0000 0000 0000" 
                                  defaultValue={isTestMode ? "4242 4242 4242 4242" : ""}
                                  className="w-full bg-transparent border-none outline-none font-mono text-lg placeholder:text-slate-300" 
                               />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <input type="text" placeholder="MM / YY" defaultValue={isTestMode ? "12/25" : ""} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                               <input type="text" placeholder="CVC" defaultValue={isTestMode ? "123" : ""} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                            </div>
                         </div>
                      ) : (
                         <div className="space-y-4">
                            <div>
                               <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Kod BLIK</label>
                               <input type="text" placeholder="000 000" maxLength={6} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none text-center font-mono text-2xl tracking-widest" />
                            </div>
                         </div>
                      )}
                      
                      <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                         <input type="checkbox" className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300" />
                         <span className="text-xs font-medium text-slate-600">{t.vatInvoice}</span>
                      </label>

                      <div className="pt-4 border-t border-slate-100">
                         <label className="flex gap-3 items-start mb-6 cursor-pointer">
                            <input type="checkbox" required defaultChecked={isTestMode} className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300" />
                            <span className="text-xs text-slate-500 leading-tight">{t.terms}</span>
                         </label>
                         
                         <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-200">
                           {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `${t.pay} ${price}`}
                         </button>
                      </div>
                   </form>
                   <button onClick={() => { authService.clearSession(); setStep(1); }} className="mt-4 text-xs text-slate-400 flex items-center gap-1 hover:text-red-500">
                      <LogOut className="w-3 h-3" /> Sign out
                   </button>
                </div>
             )}

             {/* STEP 3: SUCCESS */}
             {step === 3 && (
                <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in py-10">
                   <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                      <Check className="w-10 h-10" />
                   </div>
                   <h2 className="text-3xl font-black text-slate-900 mb-2">{t.successTitle}</h2>
                   <p className="text-slate-600 mb-8">{t.successDesc}</p>
                   {/* Auto redirect happens in handler, but we show spinner/message */}
                   <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
