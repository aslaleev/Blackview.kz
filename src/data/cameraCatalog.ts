import { useSiteContent } from '../content/siteContent';

export type CameraCategory = {
  id: string;
  title: string;
  description: string;
  useCase: string;
  image: string;
  ctaLabel: string;
};

export function useCameraCatalog(): CameraCategory[] {
  const siteContent = useSiteContent();
  return siteContent.cameraCatalog as CameraCategory[];
}
