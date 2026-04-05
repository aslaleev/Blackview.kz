import { useLayoutEffect, useState } from 'react';
import { AboutSection } from './components/sections/AboutSection';
import { CalculatorSection } from './components/sections/CalculatorSection';
import { CatalogSection } from './components/sections/CatalogSection';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/sections/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { LeadSection } from './components/sections/LeadSection';
import { PricingSection } from './components/sections/PricingSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { useSiteContent, useSiteLanguage, type SiteLanguage } from './content/siteContent';
import { useSiteConfig } from './config/site';
import { useNavigationItems } from './data/navigation';
import type { LeadCalculatorSnapshot } from './lib/lead';

type ThemeMode = 'dark' | 'light';
const languageOptions: SiteLanguage[] = ['kz', 'ru'];

function App() {
  const siteContent = useSiteContent();
  const siteConfig = useSiteConfig();
  const navigationItems = useNavigationItems();
  const { language, setLanguage } = useSiteLanguage();
  const [calculatorSnapshot, setCalculatorSnapshot] = useState<LeadCalculatorSnapshot | undefined>();
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const storedTheme = window.localStorage.getItem('camera-landing-theme');
    return storedTheme === 'light' ? 'light' : 'dark';
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    window.localStorage.setItem('camera-landing-theme', themeMode);
  }, [themeMode]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__inner">
          <a className="brand-mark" href="#hero" aria-label={siteConfig.companyName}>
            <span className="brand-mark__eyebrow">{siteConfig.brandMarkEyebrow}</span>
            <strong>{siteConfig.companyName}</strong>
          </a>

          <nav className="topbar__nav" aria-label={siteContent.header.mainNavAriaLabel}>
            {navigationItems.map((item) => (
              <a key={item.id} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="topbar__actions">
            <div className="language-toggle">
              <div className="language-toggle__options" role="group" aria-label={siteContent.header.languageSwitchAriaLabel}>
                {languageOptions.map((option) => (
                  <button
                    key={option}
                    className={`language-toggle__option${language === option ? ' language-toggle__option--active' : ''}`}
                    type="button"
                    aria-pressed={language === option}
                    onClick={() => setLanguage(option)}
                  >
                    {siteContent.header.languageOptions[option]}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="theme-toggle"
              type="button"
              onClick={() => setThemeMode((current) => (current === 'dark' ? 'light' : 'dark'))}
              aria-label={themeMode === 'dark' ? siteContent.header.enableLightAriaLabel : siteContent.header.enableDarkAriaLabel}
            >
              <strong>{themeMode === 'dark' ? siteContent.header.toLightLabel : siteContent.header.toDarkLabel}</strong>
            </button>
          </div>
        </div>
      </header>

      <main className="page-content">
        <HeroSection />
        <AboutSection />
        <CatalogSection />
        <CalculatorSection onSnapshotChange={setCalculatorSnapshot} />
        <PricingSection />
        <ProjectsSection />
        <TestimonialsSection />
        <FaqSection />
        <LeadSection calculatorSnapshot={calculatorSnapshot} />
        <Footer />
      </main>
    </div>
  );
}

export default App;
