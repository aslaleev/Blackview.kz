import { useSiteContent } from '../../content/siteContent';
import { useSiteConfig } from '../../config/site';
import { Card } from '../ui/Card';

function Footer() {
  const siteContent = useSiteContent();
  const siteConfig = useSiteConfig();

  return (
    <footer className="section-shell footer-shell">
      <Card className="footer-grid">
        <div>
          <p className="eyebrow">{siteContent.footerSection.brandEyebrow}</p>
          <h3>{siteConfig.companyName}</h3>
          <p>{siteConfig.tagline}</p>
        </div>

        <div>
          <p className="eyebrow">{siteContent.footerSection.contactsEyebrow}</p>
          <p>{siteConfig.phone}</p>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.address}</p>
        </div>

        <div>
          <p className="eyebrow">{siteContent.footerSection.metaEyebrow}</p>
          <p>{siteConfig.businessHours}</p>
          <div className="footer-links">
            {siteConfig.messengers.map((messenger) => (
              <a key={messenger.label} href={messenger.href} target="_blank" rel="noreferrer">
                {messenger.label}
              </a>
            ))}
            <a href={siteConfig.privacyPolicyHref}>{siteConfig.privacyPolicyLabel}</a>
          </div>
        </div>
      </Card>
    </footer>
  );
}

export { Footer };
