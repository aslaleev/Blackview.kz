import { useSiteContent } from '../../content/siteContent';
import { useCameraCatalog } from '../../data/cameraCatalog';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

function CatalogSection() {
  const siteContent = useSiteContent();
  const cameraCatalog = useCameraCatalog();

  return (
    <section id="catalog" className="section-shell">
      <SectionHeading
        eyebrow={siteContent.catalogSection.eyebrow}
        title={siteContent.catalogSection.title}
        description={siteContent.catalogSection.description}
      />
      <div className="card-grid">
        {cameraCatalog.map((camera) => (
          <Card key={camera.id} className="catalog-card">
            {camera.image.startsWith('http') ? (
              <div className="media-slot media-slot--catalog media-slot--photo">
                <img src={camera.image} alt={camera.title} loading="lazy" />
              </div>
            ) : (
              <div className="media-slot media-slot--catalog" aria-hidden="true">
                <span>{camera.image}</span>
              </div>
            )}
            <p className="eyebrow">{camera.useCase}</p>
            <h3>{camera.title}</h3>
            <p>{camera.description}</p>
            <p className="card-meta">{camera.ctaLabel}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export { CatalogSection };
