
import React, { useState } from 'react';
import { Globe, ShieldCheck, BookOpen, ShoppingBasket, Menu, X, LogIn } from 'lucide-react';
import { translations } from '../translations';

interface NavbarProps {
  lang: 'pl' | 'en';
  setLang: (lang: 'pl' | 'en') => void;
  basketCount: number;
  onOpenBasket: () => void;
  onNavigate: (view: 'home' | 'blog') => void;
  currentView: 'home' | 'blog';
  onLogin: () => void;
}

const Logo = ({ onClick }: { onClick: () => void }) => (
  <div className="flex items-center space-x-2 group cursor-pointer" onClick={onClick}>
    <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <rect width="40" height="40" rx="11" fill="url(#logo-grad)" />
        <path 
          d="M11 20.5L17 26.5L29 14.5" 
          stroke="white" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900">
      checkthis<span className="text-emerald-600">.co</span>
    </span>
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, basketCount, onOpenBasket, onNavigate, currentView, onLogin }) => {
  const t = translations[lang].nav;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/60 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo onClick={() => onNavigate('home')} />
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <button onClick={() => handleNavClick('how-it-works')} className="hover:text-emerald-600 transition-colors">{t.howItWorks}</button>
            <button onClick={() => handleNavClick('features')} className="hover:text-emerald-600 transition-colors">{t.features}</button>
            <button 
                onClick={() => onNavigate('blog')} 
                className={`flex items-center gap-1 hover:text-emerald-600 transition-colors ${currentView === 'blog' ? 'text-emerald-600' : ''}`}
            >
                <BookOpen className="w-3 h-3" />
                {t.blog}
            </button>
            <button onClick={() => handleNavClick('ethics')} className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Ethics
            </button>
            <button onClick={() => handleNavClick('pricing')} className="hover:text-emerald-600 transition-colors">{t.pricing}</button>
          </div>

          <div className="flex items-center space-x-3">
             <button 
                onClick={onOpenBasket}
                className="relative p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                title={t.basket}
              >
                <ShoppingBasket className="w-5 h-5" />
                {basketCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
                )}
            </button>
            
            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <button 
              onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors text-[10px] font-black text-slate-600 border border-slate-200 uppercase"
            >
              <Globe className="w-3 h-3" />
              {lang === 'pl' ? 'EN' : 'PL'}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl animate-fade-in overflow-hidden">
          <div className="p-6 space-y-4">
            <button onClick={() => handleNavClick('how-it-works')} className="w-full text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-700 uppercase tracking-widest">{t.howItWorks}</button>
            <button onClick={() => handleNavClick('features')} className="w-full text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-700 uppercase tracking-widest">{t.features}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('blog'); }} className="w-full text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> {t.blog}
            </button>
            <button onClick={() => handleNavClick('ethics')} className="w-full text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Ethics
            </button>
            <button onClick={() => handleNavClick('pricing')} className="w-full text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-700 uppercase tracking-widest">{t.pricing}</button>
            
            <div className="h-px bg-slate-100 my-2"></div>
            
            <button onClick={() => { setIsMobileMenuOpen(false); onLogin(); }} className="w-full text-left py-3 px-4 rounded-xl hover:bg-emerald-50 text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
              <LogIn className="w-4 h-4" /> {t.signIn}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
