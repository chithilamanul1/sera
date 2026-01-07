'use client';
import { useLang } from '@/context/LanguageContext';

export default function LangSwitch() {
  const { lang, toggleLang } = useLang();

  return (
    <button 
      onClick={toggleLang}
      className="fixed bottom-6 left-6 z-50 bg-black/80 backdrop-blur border border-gray-700 text-white px-4 py-2 rounded-full font-bold text-xs hover:border-primary transition-all flex items-center gap-2"
    >
      <span className={lang === 'en' ? 'text-primary' : 'text-gray-500'}>EN</span>
      <span className="w-px h-3 bg-gray-700"></span>
      <span className={lang === 'si' ? 'text-primary' : 'text-gray-500'}>සිං</span>
    </button>
  );
}