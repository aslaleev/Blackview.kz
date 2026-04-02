import { useSiteContent } from '../content/siteContent';

export type CompanyMetric = {
  label: string;
  value: string;
  caption: string;
};

export function useCompanyMetrics(): CompanyMetric[] {
  const siteContent = useSiteContent();
  return siteContent.companyMetrics as CompanyMetric[];
}
