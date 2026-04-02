export type CalculatorObjectType = 'warehouse' | 'store' | 'office' | 'house' | 'construction';

export type CalculatorResolution = '2mp' | '4mp' | '8mp';

export type CalculatorInput = {
  objectType: CalculatorObjectType;
  outdoorCameraCount: number;
  indoorCameraCount: number;
  resolution: CalculatorResolution;
  archiveDays: number;
  audioEnabled: boolean;
  nightVisionEnabled: boolean;
  installationRequired: boolean;
  siteVisitRequired: boolean;
  rentalMonths: number;
};

export type CalculatorResult = {
  totalCameras: number;
  equipmentCost: number;
  installationCost: number;
  purchaseCost: number;
  rentalMonthlyCost: number;
  rentalPeriodCost: number;
  notes: string[];
};
