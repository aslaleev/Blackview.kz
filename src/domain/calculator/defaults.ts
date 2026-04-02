import type { CalculatorInput } from './types';

export function getDefaultCalculatorInput(): CalculatorInput {
  return {
    objectType: 'warehouse',
    outdoorCameraCount: 6,
    indoorCameraCount: 4,
    resolution: '4mp',
    archiveDays: 14,
    audioEnabled: false,
    nightVisionEnabled: true,
    installationRequired: true,
    siteVisitRequired: true,
    rentalMonths: 12,
  };
}
