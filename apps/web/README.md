# Solbase Web

Next.js frontend for [Solbase](../../README.md) — prediction-market intelligence and social trading on Solana.

## Development

From the repo root:

```bash
pnpm install
pnpm -F @solbase/web dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_JUPITER_API_KEY` in `apps/web/.env.local` for live market data. See the [root README](../../README.md) for full setup and environment variables.
