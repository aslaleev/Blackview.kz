import { useSiteContent } from '../../content/siteContent';
import { usePricingRows } from '../../data/pricing';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

function PricingSection() {
  const siteContent = useSiteContent();
  const pricingRows = usePricingRows();

  return (
    <section id="pricing" className="section-shell">
      <SectionHeading
        eyebrow={siteContent.pricingSection.eyebrow}
        title={siteContent.pricingSection.title}
        description={siteContent.pricingSection.description}
      />
      <div className="card-grid">
        {pricingRows.map((row) => (
          <Card key={row.id} className="pricing-card">
            <p className="eyebrow">{row.unit}</p>
            <h3>{row.service}</h3>
            <p className="pricing-card__value">{row.price}</p>
            <p className="card-meta">{row.note}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export { PricingSection };
