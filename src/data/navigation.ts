import { useSiteContent } from '../content/siteContent';

export type NavigationItem = {
  id: string;
  label: string;
  href: `#${string}`;
};

export function useNavigationItems(): NavigationItem[] {
  const siteContent = useSiteContent();
  return siteContent.navigationItems as NavigationItem[];
}
