
import React from 'react';
import { translations } from '../translations';

interface FooterProps {
  lang: 'pl' | 'en';
}

const FooterLogo = () => (
  <div className="flex items-center space-x-2 mb-6">
    <div className="w-8 h-8">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="40" height="40" rx="10" fill="url(#footer-logo-grad)" />
        <path d="M11 20.5L17 26.5L29 14.5" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="text-xl font-black tracking-tighter text-slate-900">
      checkthis<span className="text-emerald-600">.co</span>
    </span>
  </div>
);

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang].footer;

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <FooterLogo />
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed mb-6">
              {t.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-emerald-500 transition-colors shadow-sm">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-emerald-500 transition-colors shadow-sm">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">{t.product}</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t.links?.search || "Smart Search"}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t.links?.extension || "Browser Extension"}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t.links?.app || "Mobile App"}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t.links?.api || "Business API"}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">{t.company}</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t.links?.ethics || "Ethics"}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t.links?.sources || "Sources"}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t.links?.privacy || "Privacy"}</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">{t.links?.terms || "Terms"}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
