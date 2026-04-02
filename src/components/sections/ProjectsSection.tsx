import { useMemo, useState } from 'react';
import { useSiteContent } from '../../content/siteContent';
import { useProjects } from '../../data/projects';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

function ProjectsSection() {
  const siteContent = useSiteContent();
  const projects = useProjects();
  const [activeVideoProjectId, setActiveVideoProjectId] = useState<string | null>(null);
  const activeProject = projects.find((project) => project.id === activeVideoProjectId) ?? null;

  function getYoutubeVideoId(url?: string) {
    if (!url) {
      return null;
    }

    const match = url.match(/[?&]v=([^&]+)/);
    return match?.[1] ?? null;
  }

  const activeEmbedUrl = useMemo(() => {
    const videoId = getYoutubeVideoId(activeProject?.videoUrl);

    if (!videoId) {
      return null;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  }, [activeProject]);

  return (
    <>
      <section id="projects" className="section-shell">
        <SectionHeading
          eyebrow={siteContent.projectsSection.eyebrow}
          title={siteContent.projectsSection.title}
          description={siteContent.projectsSection.description}
        />
        <div className="card-grid">
          {projects.map((project) => (
            <Card key={project.id} className="project-card">
              {project.videoUrl && getYoutubeVideoId(project.videoUrl) ? (
                <button
                  type="button"
                  className="media-slot media-slot--project media-slot--video-preview"
                  onClick={() => setActiveVideoProjectId(project.id)}
                  aria-label={project.videoLabel ?? siteContent.projectsSection.previewAriaLabel}
                >
                  <img
                    src={`https://img.youtube.com/vi/${getYoutubeVideoId(project.videoUrl)}/hqdefault.jpg`}
                    alt={project.title}
                  />
                  <span className="media-slot__play">▶</span>
                </button>
              ) : (
                <div className="media-slot media-slot--project" aria-hidden="true">
                  <span>{project.image}</span>
                </div>
              )}
              <p className="eyebrow">{project.objectType}</p>
              <h3>{project.title}</h3>
              <p>{project.task}</p>
              <div className="card-tags">
                <span>
                  {project.cameraCount} {siteContent.projectsSection.cameraUnit}
                </span>
                <span>{project.timeline}</span>
              </div>
              <p className="card-meta">{project.scope}</p>
            </Card>
          ))}
        </div>
      </section>

      {activeProject && activeEmbedUrl ? (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title} ${siteContent.projectsSection.modalTitleSuffix}`}>
          <div className="video-modal__backdrop" onClick={() => setActiveVideoProjectId(null)} />
          <div className="video-modal__dialog">
            <div className="video-modal__header">
              <div>
                <p className="eyebrow">{activeProject.objectType}</p>
                <h3>{activeProject.title}</h3>
              </div>
              <button type="button" className="video-modal__close" onClick={() => setActiveVideoProjectId(null)}>
                {siteContent.projectsSection.modalClose}
              </button>
            </div>

            <div className="video-modal__frame">
              <iframe
                src={activeEmbedUrl}
                title={activeProject.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export { ProjectsSection };
