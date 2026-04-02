import {
  AUDIO_COST_PER_CAMERA,
  CAMERA_BASE_COST,
  INSTALLATION_COST_PER_CAMERA,
  MINIMUM_RENTAL_COST,
  NIGHT_VISION_COST_PER_CAMERA,
  OBJECT_COMPLEXITY_MULTIPLIER,
  RECORDER_BASE_COST,
  RENTAL_RATE,
  RENTAL_SERVICE_COST_PER_CAMERA,
  RESOLUTION_MULTIPLIER,
  SITE_VISIT_COST,
  STORAGE_DAY_COST_PER_CAMERA,
} from './constants';
import type { CalculatorInput, CalculatorResult } from './types';

export function calculateEstimate(input: CalculatorInput): CalculatorResult {
  const outdoorCameraCount = Math.max(0, input.outdoorCameraCount);
  const indoorCameraCount = Math.max(0, input.indoorCameraCount);
  const totalCameras = outdoorCameraCount + indoorCameraCount;
  const resolutionMultiplier = RESOLUTION_MULTIPLIER[input.resolution];
  const objectMultiplier = OBJECT_COMPLEXITY_MULTIPLIER[input.objectType];

  const indoorEquipment = indoorCameraCount * CAMERA_BASE_COST.indoor * resolutionMultiplier;
  const outdoorEquipment = outdoorCameraCount * CAMERA_BASE_COST.outdoor * resolutionMultiplier;
  const recorderCost = totalCameras > 0 ? RECORDER_BASE_COST : 0;
  const storageCost = totalCameras * input.archiveDays * STORAGE_DAY_COST_PER_CAMERA;
  const audioCost = input.audioEnabled ? totalCameras * AUDIO_COST_PER_CAMERA : 0;
  const nightVisionCost = input.nightVisionEnabled ? totalCameras * NIGHT_VISION_COST_PER_CAMERA : 0;

  const equipmentCost = Math.round(
    (indoorEquipment + outdoorEquipment + recorderCost + storageCost + audioCost + nightVisionCost) *
      objectMultiplier,
  );

  const installationCost = input.installationRequired
    ? Math.round(totalCameras * INSTALLATION_COST_PER_CAMERA * objectMultiplier + (input.siteVisitRequired ? SITE_VISIT_COST : 0))
    : 0;

  const purchaseCost = equipmentCost + installationCost;
  const rentalMonthlyRaw = equipmentCost * RENTAL_RATE + totalCameras * RENTAL_SERVICE_COST_PER_CAMERA;
  const rentalMonthlyCost = Math.max(MINIMUM_RENTAL_COST, Math.round(rentalMonthlyRaw));
  const rentalPeriodCost = rentalMonthlyCost * Math.max(1, input.rentalMonths);

  return {
    totalCameras,
    equipmentCost,
    installationCost,
    purchaseCost,
    rentalMonthlyCost,
    rentalPeriodCost,
    notes: [],
  };
}
