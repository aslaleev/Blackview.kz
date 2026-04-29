import { useState } from 'react';
import { useSiteContent, useSiteLanguage } from '../../content/siteContent';
import { useSiteConfig } from '../../config/site';
import { formatCurrency } from '../../lib/format';
import type { LeadCalculatorSnapshot, LeadRequestPayload, PreferredCommunicationLanguage, PreferredContactMethod } from '../../lib/lead';
import { submitLead } from '../../lib/lead';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

type LeadSectionProps = {
  calculatorSnapshot?: LeadCalculatorSnapshot;
};

function LeadSection({ calculatorSnapshot }: LeadSectionProps) {
  const siteContent = useSiteContent();
  const siteConfig = useSiteConfig();
  const { language: siteLanguage } = useSiteLanguage();
  const [formState, setFormState] = useState(() => ({
    name: '',
    phone: '',
    preferredContactMethod: 'phone' as PreferredContactMethod,
    preferredCommunicationLanguage: siteLanguage as PreferredCommunicationLanguage,
    message: '',
  }));
  const [submissionState, setSubmissionState] = useState<{ loading: boolean; message: string }>({
    loading: false,
    message: '',
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: LeadRequestPayload = {
      ...formState,
      siteLanguage,
      calculatorSnapshot,
    };

    setSubmissionState({ loading: true, message: '' });

    try {
      const response = await submitLead(payload);
      setSubmissionState({
        loading: false,
        message: response.ok
          ? siteContent.leadSection.successMessage.replace('{reference}', response.reference)
          : siteContent.leadSection.errorMessage,
      });

      if (response.ok) {
        setFormState({
          name: '',
          phone: '',
          preferredContactMethod: 'phone',
          preferredCommunicationLanguage: siteLanguage,
          message: '',
        });
      }
    } catch (error) {
      const message =
        error instanceof Error && error.message === 'LOCAL_DEV_API_UNAVAILABLE'
          ? siteContent.leadSection.localDevErrorMessage
          : siteContent.leadSection.errorMessage;

      setSubmissionState({
        loading: false,
        message,
      });
    }
  }

  return (
    <section id="lead" className="section-shell">
      <SectionHeading
        eyebrow={siteContent.leadSection.eyebrow}
        title={siteContent.leadSection.title}
        description={siteContent.leadSection.description}
      />

      <div className="lead-layout">
        <Card tone="accent" className="lead-summary-card">
          <p className="eyebrow">{siteContent.leadSection.summaryEyebrow}</p>
          <h3>{siteConfig.companyName}</h3>
          <p>{siteConfig.heroNote}</p>

          <div className="lead-contact-list">
            <span>{siteConfig.phone}</span>
            <span>{siteConfig.email}</span>
            <span>{siteConfig.businessHours}</span>
          </div>

          {calculatorSnapshot ? (
            <div className="lead-snapshot">
              <p className="eyebrow">{siteContent.leadSection.snapshotEyebrow}</p>
              <strong>{formatCurrency(calculatorSnapshot.result.purchaseCost)}</strong>
              <p>
                {siteContent.leadSection.snapshotText.replace('{count}', String(calculatorSnapshot.result.totalCameras))}
              </p>
            </div>
          ) : null}
        </Card>

        <Card className="lead-form-card">
          <form className="lead-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span className="eyebrow">{siteContent.leadSection.nameLabel}</span>
              <input
                type="text"
                value={formState.name}
                onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                placeholder={siteContent.leadSection.namePlaceholder}
                required
              />
            </label>

            <label className="form-field">
              <span className="eyebrow">{siteContent.leadSection.phoneLabel}</span>
              <input
                type="tel"
                value={formState.phone}
                onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
                placeholder={siteContent.leadSection.phonePlaceholder}
                required
              />
            </label>

            <label className="form-field">
              <span className="eyebrow">{siteContent.leadSection.contactMethodLabel}</span>
              <select
                value={formState.preferredContactMethod}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    preferredContactMethod: event.target.value as PreferredContactMethod,
                  }))
                }
              >
                <option value="phone">{siteContent.leadSection.contactMethodOptions.phone}</option>
                <option value="whatsapp">{siteContent.leadSection.contactMethodOptions.whatsapp}</option>
                <option value="telegram">{siteContent.leadSection.contactMethodOptions.telegram}</option>
              </select>
            </label>

            <label className="form-field">
              <span className="eyebrow">{siteContent.leadSection.communicationLanguageLabel}</span>
              <select
                value={formState.preferredCommunicationLanguage}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    preferredCommunicationLanguage: event.target.value as PreferredCommunicationLanguage,
                  }))
                }
              >
                <option value="kz">{siteContent.leadSection.communicationLanguageOptions.kz}</option>
                <option value="ru">{siteContent.leadSection.communicationLanguageOptions.ru}</option>
              </select>
            </label>

            <label className="form-field form-field--full">
              <span className="eyebrow">{siteContent.leadSection.messageLabel}</span>
              <textarea
                rows={5}
                value={formState.message}
                onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                placeholder={siteContent.leadSection.messagePlaceholder}
              />
            </label>

            <div className="lead-form__actions">
              <Button type="submit" variant="primary">
                {submissionState.loading ? siteContent.leadSection.submitLoading : siteContent.leadSection.submitIdle}
              </Button>
            </div>

            {submissionState.message ? <p className="lead-form__message">{submissionState.message}</p> : null}
          </form>
        </Card>
      </div>
    </section>
  );
}

export { LeadSection };
