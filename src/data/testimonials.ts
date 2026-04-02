import { useSiteContent } from '../content/siteContent';

export type Testimonial = {
  id: string;
  author: string;
  companyOrContext: string;
  text: string;
};

export function useTestimonials(): Testimonial[] {
  const siteContent = useSiteContent();
  return siteContent.testimonials as Testimonial[];
}
