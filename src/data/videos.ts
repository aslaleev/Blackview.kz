import { useSiteContent } from '../content/siteContent';

export type VideoExample = {
  id: string;
  title: string;
  scenario: string;
  preview: string;
};

export function useVideoExamples(): VideoExample[] {
  const siteContent = useSiteContent();
  return siteContent.videoExamples as VideoExample[];
}
