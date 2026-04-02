import { useState } from 'react';
import { useSiteContent } from '../../content/siteContent';
import { useFaqItems } from '../../data/faq';
import { SectionHeading } from '../ui/SectionHeading';

function FaqSection() {
  const siteContent = useSiteContent();
  const faqItems = useFaqItems();
  const [openItemId, setOpenItemId] = useState<string>(faqItems[0]?.id ?? '');

  return (
    <section id="faq" className="section-shell">
      <SectionHeading
        eyebrow={siteContent.faqSection.eyebrow}
        title={siteContent.faqSection.title}
        description={siteContent.faqSection.description}
      />

      <div className="faq-list">
        {faqItems.map((item) => {
          const isOpen = item.id === openItemId;

          return (
            <article key={item.id} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
              <button
                className="faq-item__trigger"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenItemId(isOpen ? '' : item.id)}
              >
                <span>{item.question}</span>
                <span>{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen ? <div className="faq-item__content">{item.answer}</div> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export { FaqSection };
