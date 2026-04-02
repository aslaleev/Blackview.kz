import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import siteContentRuJson from './siteContent.json';
import siteContentKzJson from './siteContent_kz.json';

export type SiteLanguage = 'ru' | 'kz';
export type SiteContent = typeof siteContentRuJson;

const SITE_LANGUAGE_STORAGE_KEY = 'camera-landing-language';

const siteContentByLanguage: Record<SiteLanguage, SiteContent> = {
  ru: siteContentRuJson,
  kz: siteContentKzJson,
};

type SiteContentContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
  siteContent: SiteContent;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

function getInitialLanguage(): SiteLanguage {
  if (typeof window === 'undefined') {
    return 'ru';
  }

  const storedLanguage = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
  return storedLanguage === 'kz' ? 'kz' : 'ru';
}

function getDocumentLanguage(language: SiteLanguage): string {
  return language === 'kz' ? 'kk' : 'ru';
}

function SiteContentProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = getDocumentLanguage(language);
    window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      siteContent: siteContentByLanguage[language],
    }),
    [language],
  );

  return createElement(SiteContentContext.Provider, { value }, children);
}

function useSiteContentContext(): SiteContentContextValue {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error('useSiteContentContext must be used within SiteContentProvider');
  }

  return context;
}

function useSiteContent(): SiteContent {
  return useSiteContentContext().siteContent;
}

function useSiteLanguage() {
  const { language, setLanguage } = useSiteContentContext();

  return {
    language,
    setLanguage,
  };
}

export { SiteContentProvider, useSiteContent, useSiteLanguage };
