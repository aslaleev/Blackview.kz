import { useSiteContent } from '../../content/siteContent';
import { useSiteConfig } from '../../config/site';
import { useCompanyMetrics } from '../../data/companyMetrics';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

function HeroSection() {
  const siteContent = useSiteContent();
  const siteConfig = useSiteConfig();
  const companyMetrics = useCompanyMetrics();

  return (
    <section id="hero" className="hero-panel section-shell">
      <div>
        <Badge>{siteContent.heroSection.badge}</Badge>
        <h1>{siteConfig.tagline}</h1>
        <p>{siteConfig.heroNote}</p>

        <div className="hero-panel__actions">
          <Button href="#calculator" variant="primary">
            {siteContent.heroSection.primaryCta}
          </Button>
          <Button href="#lead" variant="secondary">
            {siteContent.heroSection.secondaryCta}
          </Button>
        </div>

        <div className="hero-panel__signal-row">
          {siteContent.heroSection.signals.map((signal) => (
            <div key={signal.label} className="hero-panel__signal-card">
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
            </div>
          ))}
        </div>

        <ul className="hero-panel__trust-list">
          {siteContent.heroSection.trustHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <Card tone="accent" className="hero-panel__aside">
        <div>
          <p className="eyebrow">{siteContent.heroSection.asideEyebrow}</p>
          <h3>{siteContent.heroSection.asideTitle}</h3>
          <div className="metric-grid">
            {companyMetrics.slice(0, 3).map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel__contact-strip">
          <span>{siteConfig.phone}</span>
          <span>{siteConfig.businessHours}</span>
          <span>{siteConfig.address}</span>
        </div>
      </Card>
    </section>
  );
}

export { HeroSection };
