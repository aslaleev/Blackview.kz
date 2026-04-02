import { useSiteContent } from '../../content/siteContent';
import { useCompanyMetrics } from '../../data/companyMetrics';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

function AboutSection() {
  const siteContent = useSiteContent();
  const companyMetrics = useCompanyMetrics();

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

      <div className="stats-strip">
        {companyMetrics.map((metric) => (
          <Card key={metric.label}>
            <p className="eyebrow">{metric.label}</p>
            <h3>{metric.value}</h3>
            <p>{metric.caption}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export { AboutSection };
