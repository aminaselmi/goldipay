import { useTranslation } from 'react-i18next';

export const useTranslate = () => {
  const { t, i18n } = useTranslation();
  
  const translate = (key, options = {}) => {
    return t(key, options);
  };
  
  const isRTL = i18n.language === 'ar';
  
  return { translate, isRTL, currentLanguage: i18n.language };
};