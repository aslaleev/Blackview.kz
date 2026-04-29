import { useSiteContent } from '../../content/siteContent';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

function AboutSection() {
  const siteContent = useSiteContent();

  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow={siteContent.aboutSection.eyebrow}
        title={siteContent.aboutSection.title}
        description={siteContent.aboutSection.description}
      />

      <div className="card-grid">
        {siteContent.aboutSection.servicePillars.map((pillar) => (
          <Card key={pillar.title}>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </Card>
        ))}
      </div>

    </section>
  );
}

export { AboutSection };
