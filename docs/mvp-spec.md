# Solbase MVP Spec

## Product vision

Solbase is a **prediction-market intelligence platform** on Solana:

> Bloomberg Terminal meets social trading for prediction markets.

Users discover markets, analyze outcomes, follow top traders, and participate in community narratives—not a DEX-first or token-swap product. The long-term loop combines **market intelligence**, **social trading**, and **wallet-connected participation** as trading and portfolio features ship.

---

## Navigation

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Redirects to `/markets` | Implemented |
| `/markets` | Default landing — market discovery grid | Implemented |
| `/markets/market/[id]?event=...` | Market detail (requires `event` query) | Implemented |
| `/portfolio` | Positions, P&L, AI portfolio analysis | Implemented (mock dashboard) |
| `/leaderboard` | Top traders by performance | Implemented (mock dashboard) |
| `/community` | Market and trader discussion feed | Implemented (mock dashboard) |
| `/trader/[wallet]` | Public trader profile by wallet | Implemented (mock) |
| `/profile` | Legacy — redirects to `/portfolio` | Redirect |
| `/profile/[wallet]` | Legacy — redirects to `/trader/[wallet]` | Redirect |

**Legacy redirects (permanent 308):**

- `/predict` → `/markets`
- `/predict/market/:marketId` → `/markets/market/:marketId` (query string preserved)
- `/swap` → `/markets`

---

## MVP feature phases

### Phase 1 — Discovery foundation (current)

- Jupiter Prediction API integration for browse and detail
- Category filters, sort, sports games/props, trades side panel
- Wallet connect (Wallet Standard) and theme toggle
- Top-level nav shell with placeholder sections

### Phase 2 — Social and portfolio surface

- Portfolio: positions, P&L, watchlists
- Leaderboard: ranked traders, consistency metrics
- Community: threads per market/event, narratives
- Profile: public stats, followers, reputation

### Phase 3 — Trading and intelligence

- Take and manage positions on outcomes
- Settlement and redemption flows
- AI portfolio analysis and market intelligence alerts
- Social prediction trading (follow/copy, shared theses)

---

## Current implemented status

| Capability | Status | Notes |
|------------|--------|-------|
| Market browse grid | Done | `MarketsBrowseShell`, `/markets` |
| Market detail | Done | `/markets/market/[id]?event=` |
| Wallet connect | Done | Global nav |
| Theme toggle | Done | Light/dark |
| Portfolio page | Done | Mock dashboard; wallet-gated; `components/portfolio/` |
| Leaderboard page | Done | Mock rankings; filters; `components/leaderboard/` |
| Community page | Done | Mock feed, filters, sidebar; `components/community/` |
| Trader profile pages | Done | `/trader/[wallet]`; `components/profile/` |
| User settings | Done | Gear dialog in nav when connected; `components/settings/` |
| Sub-nav Degen / For You | Stub | “Coming soon” |
| Trading / positions | Not started | Jupiter order flow TBD |
| AI analysis | Not started | Planned `packages/ai-agents` integration |
| Legacy URL compatibility | Done | `next.config.ts` redirects |

**Code layout (UI):** `apps/web/components/markets/`, `apps/web/components/portfolio/`, `apps/web/components/leaderboard/`, `apps/web/components/profile/`, `apps/web/components/settings/`, `apps/web/components/community/`  
**Mock data:** `apps/web/lib/mock/portfolio.ts`, `apps/web/lib/mock/leaderboard.ts`, `apps/web/lib/mock/profile.ts`, `apps/web/lib/mock/community.ts`  
**Data layer (unchanged):** `apps/web/lib/prediction/`, `apps/web/hooks/prediction/`

---

## Next build priorities

1. **Portfolio live data** — Replace `getMockPortfolio()` in `use-portfolio.ts` with Jupiter positions API keyed on wallet
2. **Leaderboard live data** — Replace `getLeaderboardRows` with indexed trader performance API
3. **Community live data** — Replace `getCommunityPosts` with API; enable composer POST
4. **Trader profile live data** — Replace `getTraderProfileByWallet` with indexer/API; sync follow graph
5. **Settings persistence** — Save user settings to backend or localStorage
6. **Trading flow** — Buy/sell outcome shares without changing browse UX
7. **AI portfolio analysis** — First agent summary on connected wallet positions
8. **Sub-nav Degen / For You** — Product definition, then replace “Coming soon” panels

---

## Non-goals (MVP)

- DEX swap UI or token swap routes (removed; `/swap` redirects only)
- Full redesign of market cards or browse chrome
- On-chain market creation or resolution (out of initial MVP)

---

## Related docs

- [README](../README.md) — install, env vars, monorepo layout
- [idea.md](./idea.md) — problem/thesis (stub)
- [roadmap.md](./roadmap.md) — phased delivery (stub)
