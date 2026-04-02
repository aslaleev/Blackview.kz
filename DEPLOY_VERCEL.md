# Deploy To Vercel

## What this project needs

The lead form sends data from the frontend to the serverless function in `api/lead.ts`.
That function then sends the message to Telegram.

This means Telegram delivery does **not** work in plain `vite dev`.
It works on Vercel, or locally through `vercel dev`.

## Required environment variables

Set these in Vercel Project Settings -> Environment Variables:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Example:

```env
TELEGRAM_BOT_TOKEN=replace_with_your_fresh_bot_token
TELEGRAM_CHAT_ID=5674814985
```

## Recommended security step

The bot token was exposed during setup, so before production:

1. Open `@BotFather`
2. Run `/revoke`
3. Select `@Camery_Uralsk_bot`
4. Copy the new token
5. Put the new token into Vercel env vars

## Deploy steps

1. Push this project to GitHub
2. Open [Vercel](https://vercel.com/)
3. Import the GitHub repository
4. Framework preset: `Vite`
5. Add env vars:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
6. Click `Deploy`

## After deploy

1. Open the deployed site
2. Submit the form
3. Check Telegram chat `5674814985`

## Local testing with Vercel

If you want Telegram delivery locally:

1. Install Vercel CLI
   ```bash
   npm i -g vercel
   ```
2. Login
   ```bash
   vercel login
   ```
3. Run local Vercel dev server
   ```bash
   vercel dev
   ```

This will run both the frontend and the `api/lead.ts` function.
