import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export function useTranslation() {
  const { lang, setLang, toggleLang } = useLanguage();
  
  const t = (key) => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translation[lang] || translation.en || key;
  };

  return { t, lang, setLang, toggleLang };
}