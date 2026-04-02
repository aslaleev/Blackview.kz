import { useSiteContent } from '../content/siteContent';

export type ProjectCase = {
  id: string;
  title: string;
  objectType: string;
  task: string;
  scope: string;
  cameraCount: number;
  timeline: string;
  image: string;
  videoUrl?: string;
  videoLabel?: string;
};

export function useProjects(): ProjectCase[] {
  const siteContent = useSiteContent();
  return siteContent.projects as ProjectCase[];
}
