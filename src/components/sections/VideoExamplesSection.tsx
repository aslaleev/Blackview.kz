import { useSiteContent } from '../../content/siteContent';
import { useVideoExamples } from '../../data/videos';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

function VideoExamplesSection() {
  const siteContent = useSiteContent();
  const videoExamples = useVideoExamples();

  return (
    <section id="videos" className="section-shell">
      <SectionHeading
        eyebrow={siteContent.videoSection.eyebrow}
        title={siteContent.videoSection.title}
        description={siteContent.videoSection.description}
      />
      <div className="card-grid">
        {videoExamples.map((example) => (
          <Card key={example.id} className="video-card">
            <div className="media-slot media-slot--video" aria-hidden="true">
              <span>{example.preview}</span>
            </div>
            <p className="eyebrow">{example.scenario}</p>
            <h3>{example.title}</h3>
            <p className="card-meta">{siteContent.videoSection.meta}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export { VideoExamplesSection };
