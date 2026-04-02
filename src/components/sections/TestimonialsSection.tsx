import { useSiteContent } from '../../content/siteContent';
import { useTestimonials } from '../../data/testimonials';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

function TestimonialsSection() {
  const siteContent = useSiteContent();
  const testimonials = useTestimonials();

  return (
    <section id="testimonials" className="section-shell">
      <SectionHeading
        eyebrow={siteContent.testimonialsSection.eyebrow}
        title={siteContent.testimonialsSection.title}
        description={siteContent.testimonialsSection.description}
      />
      <div className="card-grid compact-grid">
        {testimonials.map((item) => (
          <Card key={item.id} className="testimonial-card">
            <p className="eyebrow">{item.companyOrContext}</p>
            <h3>{item.author}</h3>
            <p>{item.text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export { TestimonialsSection };
