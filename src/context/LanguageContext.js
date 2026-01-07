'use client';
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'si' : 'en');

  // THE "SPOKEN SINHALA" DICTIONARY
  const t = (key) => {
    const dict = {
      // HERO SECTION
      'hero.subtitle': { 
        en: 'WE BUILD', 
        si: 'අපි හදන්නේ' // "What we build" (Natural)
      },
      'hero.title': { 
        en: 'WEBSITES & APPS.', 
        si: 'සුපිරි Websites සහ Apps.' // "Super/Cool Websites & Apps" (Using English loanwords is standard in tech)
      },
      'hero.desc': {
        en: 'We make professional websites and software for businesses in Sri Lanka. Simple, fast, and built to help you grow.',
        si: 'ඔයාගේ බිස්නස් එක ඊළඟ Level එකට ගේන්න, හරිම විදියට හදපු Website එකක් ඕනෙමයි. අපි වැඩේ කරලා දෙන්නම්.' // "To bring your business to the next level... we will do the job."
      },
      
      // CALL TO ACTION
      'cta.start': { 
        en: 'Start Your Project', 
        si: 'වැඩේ පටන් ගමු' // "Let's start the work" (Friendly/Active)
      },
      'cta.work': { 
        en: 'See Our Work', 
        si: 'අපි කරපු වැඩ' // "Work we have done"
      },

      // SERVICES
      'services.title': { en: 'WHAT WE DO', si: 'අපේ වැඩ' },
      'services.web.title': { en: 'Modern Websites', si: 'Websites ඩිසයින්' },
      'services.web.desc': { 
         en: 'Fast, secure websites that look great on mobile phones.', 
         si: 'Phone එකෙන් බලද්දිත් ලස්සනට පේන, Speed එක වැඩි Websites.' 
      },
      'services.soft.title': { en: 'Custom Software', si: 'සිස්ටම් (Software)' },
      'services.soft.desc': { 
         en: 'Systems to replace Excel and paper books.', 
         si: 'පොත් වල ලිය ලිය ඉන්න එපා. Stock, Sales ඔක්කොම බලාගන්න සොෆ්ට්වෙයාර් එකක් ගහමු.' // "Don't keep writing in books. Let's build a software..."
      },
      'services.brand.title': { en: 'Logo & Branding', si: 'ලෝගෝ සහ බ්‍රෑන්ඩින්' },
      'services.brand.desc': { 
         en: 'Make your business look trustworthy.', 
         si: 'බිස්නස් එකට ගැම්මක් එන විදියේ ලෝගෝ ඩිසයින්.' // "Logo designs that give your business a 'Gammac' (Style/Power)."
      },

      // COMPARISON
      'compare.title': { en: 'SEE THE DIFFERENCE', si: 'වෙනස බලන්න' },
      'compare.old': { en: 'Old Website', si: 'පරණ විදිය' },
      'compare.new': { en: 'THE NEW SITE', si: 'Seranex වෙබ් අඩවිය' },

      // TRUST
      'faq.title': { en: 'Common Questions', si: 'නිතර අසන ප්‍රශ්න' },
    };
    return dict[key] ? dict[key][lang] : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);