import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageEffect = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Apply RTL/LTR to entire document
    const applyDirection = () => {
      const isRTL = i18n.language === 'ar';
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = i18n.language;
      
      // Add class to body for additional styling
      if (isRTL) {
        document.body.classList.add('rtl');
        document.body.classList.remove('ltr');
      } else {
        document.body.classList.add('ltr');
        document.body.classList.remove('rtl');
      }
    };

    applyDirection();
    
    // Listen for language changes
    i18n.on('languageChanged', applyDirection);
    
    return () => {
      i18n.off('languageChanged', applyDirection);
    };
  }, [i18n]);

  return null;
};

export default LanguageEffect;