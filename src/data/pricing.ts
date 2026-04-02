import { useSiteContent } from '../content/siteContent';

export type PriceRow = {
  id: string;
  service: string;
  unit: string;
  price: string;
  note: string;
};

export function usePricingRows(): PriceRow[] {
  const siteContent = useSiteContent();
  return siteContent.pricingRows as PriceRow[];
}
