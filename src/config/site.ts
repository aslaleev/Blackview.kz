import { useSiteContent } from '../content/siteContent';

export type MessengerLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  companyName: string;
  tagline: string;
  heroNote: string;
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  primaryCtaLabel: string;
  privacyPolicyLabel: string;
  privacyPolicyHref: string;
  messengers: MessengerLink[];
  brandMarkEyebrow?: string;
};

export function useSiteConfig(): SiteConfig {
  const siteContent = useSiteContent();
  return siteContent.siteConfig as SiteConfig;
}
