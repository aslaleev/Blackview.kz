import { useEffect, useState } from 'react';
import { useSiteContent } from '../../content/siteContent';
import { calculateEstimate } from '../../domain/calculator/calculateEstimate';
import { getDefaultCalculatorInput } from '../../domain/calculator/defaults';
import type { CalculatorInput, CalculatorObjectType } from '../../domain/calculator/types';
import { formatCurrency } from '../../lib/format';
import type { LeadCalculatorSnapshot } from '../../lib/lead';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

type CalculatorSectionProps = {
  onSnapshotChange: (snapshot: LeadCalculatorSnapshot) => void;
};

type CalculatorNoteTemplates = {
  empty: string;
  count: string;
  installationIncluded: string;
  installationExcluded: string;
  audioIncluded: string;
  audioExcluded: string;
  archiveExtended: string;
  archiveStandard: string;
};

function buildEstimateNotes(input: CalculatorInput, totalCameras: number, noteTemplates: CalculatorNoteTemplates): string[] {
  return [
    totalCameras === 0 ? noteTemplates.empty : noteTemplates.count.replace('{count}', String(totalCameras)),
    input.installationRequired ? noteTemplates.installationIncluded : noteTemplates.installationExcluded,
    input.audioEnabled ? noteTemplates.audioIncluded : noteTemplates.audioExcluded,
    input.archiveDays >= 30 ? noteTemplates.archiveExtended : noteTemplates.archiveStandard,
  ];
}

function CalculatorSection({ onSnapshotChange }: CalculatorSectionProps) {
  const siteContent = useSiteContent();
  const [input, setInput] = useState<CalculatorInput>(getDefaultCalculatorInput);
  const objectLabels = siteContent.calculatorSection.objectLabels as Record<CalculatorObjectType, string>;
  const baseResult = calculateEstimate(input);
  const result = {
    ...baseResult,
    notes: buildEstimateNotes(input, baseResult.totalCameras, siteContent.calculatorSection.noteTemplates as CalculatorNoteTemplates),
  };

  useEffect(() => {
    const nextBaseResult = calculateEstimate(input);

    onSnapshotChange({
      input,
      result: {
        ...nextBaseResult,
        notes: buildEstimateNotes(input, nextBaseResult.totalCameras, siteContent.calculatorSection.noteTemplates as CalculatorNoteTemplates),
      },
    });
  }, [input, onSnapshotChange, siteContent]);

  function updateInput<K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <section id="calculator" className="section-shell">
      <SectionHeading
        eyebrow={siteContent.calculatorSection.eyebrow}
        title={siteContent.calculatorSection.title}
        description={siteContent.calculatorSection.description}
      />

      <div className="calculator-layout">
        <Card className="calculator-form-card">
          <div className="form-grid">
            <label className="form-field">
              <span className="eyebrow">{siteContent.calculatorSection.objectTypeLabel}</span>
              <select value={input.objectType} onChange={(event) => updateInput('objectType', event.target.value as CalculatorObjectType)}>
                {Object.entries(objectLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span className="eyebrow">{siteContent.calculatorSection.outdoorCameraLabel}</span>
              <input
                type="number"
                min="0"
                max="64"
                value={input.outdoorCameraCount}
                onChange={(event) => updateInput('outdoorCameraCount', Number(event.target.value))}
              />
            </label>

            <label className="form-field">
              <span className="eyebrow">{siteContent.calculatorSection.indoorCameraLabel}</span>
              <input
                type="number"
                min="0"
                max="64"
                value={input.indoorCameraCount}
                onChange={(event) => updateInput('indoorCameraCount', Number(event.target.value))}
              />
            </label>

            <label className="form-field">
              <span className="eyebrow">{siteContent.calculatorSection.archiveDaysLabel}</span>
              <input
                type="range"
                min="7"
                max="45"
                step="1"
                value={input.archiveDays}
                onChange={(event) => updateInput('archiveDays', Number(event.target.value))}
              />
              <span className="form-field__hint">
                {input.archiveDays} {siteContent.calculatorSection.archiveDaysUnit}
              </span>
            </label>

          </div>

          <div className="toggle-grid">
            <label className="toggle-card">
              <input type="checkbox" checked={input.installationRequired} onChange={(event) => updateInput('installationRequired', event.target.checked)} />
              <span>{siteContent.calculatorSection.toggleLabels.installationRequired}</span>
            </label>
            <label className="toggle-card">
              <input type="checkbox" checked={input.siteVisitRequired} onChange={(event) => updateInput('siteVisitRequired', event.target.checked)} />
              <span>{siteContent.calculatorSection.toggleLabels.siteVisitRequired}</span>
            </label>
            <label className="toggle-card">
              <input type="checkbox" checked={input.audioEnabled} onChange={(event) => updateInput('audioEnabled', event.target.checked)} />
              <span>{siteContent.calculatorSection.toggleLabels.audioEnabled}</span>
            </label>
          </div>
        </Card>

        <Card tone="accent" className="calculator-result-card">
          <p className="eyebrow">{siteContent.calculatorSection.summaryEyebrow}</p>
          <h3>
            {result.totalCameras} {siteContent.calculatorSection.cameraCountSuffix}
          </h3>

          <div className="result-grid">
            <div>
              <span>{siteContent.calculatorSection.equipmentLabel}</span>
              <strong>{formatCurrency(result.equipmentCost)}</strong>
            </div>
            <div>
              <span>{siteContent.calculatorSection.installationLabel}</span>
              <strong>{formatCurrency(result.installationCost)}</strong>
            </div>
            <div>
              <span>{siteContent.calculatorSection.purchaseLabel}</span>
              <strong>{formatCurrency(result.purchaseCost)}</strong>
            </div>
          </div>

          <ul className="result-notes">
            {result.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>

          <div className="hero-panel__actions">
            <Button href="#lead" variant="primary">
              {siteContent.calculatorSection.submitCta}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

export { CalculatorSection };
