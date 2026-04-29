import type { CalculatorObjectType, CalculatorResolution } from './types';

export const CAMERA_BASE_COST = {
  indoor: 22000,
  outdoor: 32000,
} as const;

export const RESOLUTION_MULTIPLIER: Record<CalculatorResolution, number> = {
  '2mp': 1,
  '4mp': 1.22,
  '8mp': 1.48,
};

export const OBJECT_COMPLEXITY_MULTIPLIER: Record<CalculatorObjectType, number> = {
  warehouse: 1.18,
  store: 1.05,
  pharmacy: 1.04,
  office: 1,
  parking: 1.16,
  production: 1.24,
  yard: 0.96,
  apartmentEntrance: 1.08,
  stairwell: 1.06,
  other: 1,
};

export const RECORDER_BASE_COST = 58000;
export const STORAGE_DAY_COST_PER_CAMERA = 620;
export const AUDIO_COST_PER_CAMERA = 2800;
export const NIGHT_VISION_COST_PER_CAMERA = 2400;
export const INSTALLATION_COST_PER_CAMERA = 13500;
export const SITE_VISIT_COST = 18000;
export const RENTAL_RATE = 0.061;
export const RENTAL_SERVICE_COST_PER_CAMERA = 4200;
export const MINIMUM_RENTAL_COST = 32000;
