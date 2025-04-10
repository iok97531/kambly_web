import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

type TranslationKey = 'welcome' | 'login' | 'signup' | 'logout';

interface Translations {
  [key: string]: {
    [key in TranslationKey]: string;
  };
}

// 임시 번역 데이터
const translations: Translations = {
  ko: {
    'welcome': '환영합니다',
    'login': '로그인',
    'signup': '회원가입',
    'logout': '로그아웃',
    // 필요한 번역 키를 여기에 추가
  },
  en: {
    'welcome': 'Welcome',
    'login': 'Login',
    'signup': 'Sign Up',
    'logout': 'Logout',
    // 필요한 번역 키를 여기에 추가
  },
};

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[language][key as TranslationKey] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}; 