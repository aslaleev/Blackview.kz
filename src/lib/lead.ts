import type { CalculatorInput, CalculatorResult } from '../domain/calculator/types';
import type { SiteLanguage } from '../content/siteContent';

export type PreferredContactMethod = 'phone' | 'whatsapp' | 'telegram';
export type PreferredCommunicationLanguage = SiteLanguage;

export type LeadCalculatorSnapshot = {
  input: CalculatorInput;
  result: CalculatorResult;
};

export type LeadRequestPayload = {
  name: string;
  phone: string;
  preferredContactMethod: PreferredContactMethod;
  preferredCommunicationLanguage: PreferredCommunicationLanguage;
  siteLanguage: SiteLanguage;
  message: string;
  calculatorSnapshot?: LeadCalculatorSnapshot;
};

export async function submitLead(payload: LeadRequestPayload): Promise<{ ok: boolean; reference: string }> {
  let response: Response;

  try {
    response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('LOCAL_DEV_API_UNAVAILABLE');
  }

  let data: { ok?: boolean; reference?: string; error?: string } = {};

  try {
    data = (await response.json()) as { ok?: boolean; reference?: string; error?: string };
  } catch {
    data = {};
  }

  if (!response.ok || !data.ok || !data.reference) {
    if (response.status === 404 || response.status === 405) {
      throw new Error('LOCAL_DEV_API_UNAVAILABLE');
    }

    throw new Error(data.error ?? 'Lead submission failed');
  }

  return {
    ok: true,
    reference: data.reference,
  };
}
