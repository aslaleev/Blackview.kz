import { useSiteContent } from '../content/siteContent';

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function useFaqItems(): FaqItem[] {
  const siteContent = useSiteContent();
  return siteContent.faqItems as FaqItem[];
}
