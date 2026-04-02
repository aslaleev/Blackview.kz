type LeadCalculatorSnapshot = {
  input: {
    objectType: string;
    outdoorCameraCount: number;
    indoorCameraCount: number;
    resolution: string;
    archiveDays: number;
    audioEnabled: boolean;
    nightVisionEnabled: boolean;
    installationRequired: boolean;
    siteVisitRequired: boolean;
    rentalMonths: number;
  };
  result: {
    totalCameras: number;
    equipmentCost: number;
    installationCost: number;
    purchaseCost: number;
    rentalMonthlyCost: number;
    rentalPeriodCost: number;
    notes: string[];
  };
};

type LeadRequestPayload = {
  name: string;
  phone: string;
  preferredContactMethod: 'phone' | 'whatsapp' | 'telegram';
  preferredCommunicationLanguage: 'ru' | 'kz';
  siteLanguage: 'ru' | 'kz';
  message: string;
  calculatorSnapshot?: LeadCalculatorSnapshot;
};

type VercelRequest = {
  method?: string;
  body?: LeadRequestPayload;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (payload: unknown) => void;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function buildTelegramMessage(payload: LeadRequestPayload, reference: string): string {
  const contactMethodLabels = {
    phone: 'Звонок',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
  } as const;

  const languageLabels = {
    ru: 'Русский',
    kz: 'Казахский',
  } as const;

  const lines = [
    'Новая заявка с сайта видеонаблюдения',
    '',
    `Номер: ${reference}`,
    `Имя: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    `Канал связи: ${contactMethodLabels[payload.preferredContactMethod]}`,
    `Язык сайта: ${languageLabels[payload.siteLanguage]}`,
    `Язык общения: ${languageLabels[payload.preferredCommunicationLanguage]}`,
    `Комментарий: ${payload.message || '-'}`,
  ];

  if (payload.calculatorSnapshot) {
    const { input, result } = payload.calculatorSnapshot;
    lines.push(
      '',
      'Снимок расчета',
      `Тип объекта: ${input.objectType}`,
      `Камер: ${result.totalCameras}`,
      `Уличные / внутренние: ${input.outdoorCameraCount} / ${input.indoorCameraCount}`,
      `Разрешение: ${input.resolution}`,
      `Архив, дней: ${input.archiveDays}`,
      `Покупка: ${formatCurrency(result.purchaseCost)}`,
      `Аренда в месяц: ${formatCurrency(result.rentalMonthlyCost)}`,
      `Аренда за срок: ${formatCurrency(result.rentalPeriodCost)}`,
    );
  }

  return lines.join('\n');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(500).json({ ok: false, error: 'Telegram environment variables are missing' });
    return;
  }

  const payload = req.body;

  if (!payload?.name || !payload?.phone) {
    res.status(400).json({ ok: false, error: 'Name and phone are required' });
    return;
  }

  const reference = `AV-${Date.now().toString(36).toUpperCase()}`;
  const text = buildTelegramMessage(payload, reference);

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!telegramResponse.ok) {
    const errorText = await telegramResponse.text();
    res.status(502).json({ ok: false, error: `Telegram request failed: ${errorText}` });
    return;
  }

  res.status(200).json({ ok: true, reference });
}
