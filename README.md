# SolBase API

**Seamlessly on-ramp backend infrastructure for Solana apps.**

SolBase provides a drop-in backend for Solana applications: managed wallets, secure transaction signing, RPC proxying & caching, webhook subscriptions, SPL utilities, and complete developer SDKs—so you can ship features faster without building blockchain infra from scratch.

---

## 🚀 Overview

SolBase is designed to help developers build Solana-based APIs, apps, and services with minimal overhead. It abstracts away the complexity of managing RPC connections, signing flows, subscription handling, token operations, and backend infrastructure.

**Build features, not boilerplate.**

---

## Monorepo Layout

- `apps/web`: Next.js app router frontend.
- `packages/platform`, `packages/ai-agents`, `packages/crypto`, `packages/ui`: shared workspace packages.
- `jobs/*`: scheduled/reporting workers.
- Go API remains at repo root (`main.go`) and runs on `:3001`.

---

## ✨ Features

* **Managed Wallet & Key Storage** — Generate and store user wallets securely.
* **Secure Signing Service** — Server-side transaction signing with auditing.
* **RPC Proxy & Caching** — High‑performance RPC passthrough with retry logic & caching.
* **Webhooks & Event Subscriptions** — Receive account change events, program logs, SPL transfers, and more.
* **Transaction Sending & Simulation** — Built-in simulation, batching, and retry queues.
* **SPL Token Tools** — Mint, transfer, manage ATAs, and handle token lifecycle flows.
* **Developer SDKs** — JS/TS, Go, and Python clients.
* **Permissions & API Keys** — Role-based access and scoped API keys.
* **Observability Dashboard** — Metrics, logs, tracing, and monitoring.

---

## 🧱 Architecture Goals

* Fast integration for developers launching Solana apps
* Safe & secure transaction management
* Highly scalable backend with clear SLAs
* Multi-tenant support and key isolation
* Drop-in local development environment

---

## 🛠️ API Endpoints

Below are representative routes. Full OpenAPI spec available soon.

### Authentication

**POST /v1/auth/token**

```json
{
  "apiKey": "sk_live_..."
}
```

Response:

```json
{
  "access_token": "ey...",
  "expires_in": 3600
}
```

### Wallets

**Create Wallet**

POST `/v1/wallets`

```json
{
  "user_id": "user-123",
  "purpose": "app-wallet",
  "derivation": "ed25519-standard",
  "store_policy": "encrypted"
}
```

Response:

```json
{
  "wallet_id": "w_abc123",
  "pubkey": "9xW...",
  "created_at": "2025-12-03T..."
}
```

**Get Wallet**

GET `/v1/wallets/{wallet_id}`

```json
{
  "pubkey": "..."
}
```

### Signing

**Sign Transaction**

POST `/v1/wallets/{wallet_id}/sign`

```json
{
  "message": "<base64-encoded-transaction-message>",
  "nonce": "...",
  "metadata": { "trace_id": "..." }
}
```

Response:

```json
{
  "signed_tx": "<base64-signed-tx>",
  "signature": "5f..."
}
```

### RPC Proxy

POST `/v1/rpc`

```json
{
  "method": "getProgramAccounts",
  "params": ["<programPubkey>", { "commitment": "confirmed" }],
  "cache_for_seconds": 15
}
```

### Sending Transactions

POST `/v1/transactions/send`

```json
{
  "signed_tx": "<base64-signed-tx>",
  "wallet_id": "w_abc123",
  "simulate_first": true
}
```

Response:

```json
{
  "txid": "5G...",
  "status": "submitted"
}
```

### Subscriptions & Webhooks

POST `/v1/subscriptions`

```json
{
  "type": "account_change",
  "account": "So11111111111111111111111111111111111111112",
  "callback_url": "https://example.com/webhook",
  "filters": { "minLamports": 1000 }
}
```

Webhook payload:

```json
{
  "subscription_id": "sub_01",
  "account": "...",
  "slot": 12345678,
  "data_base64": "....",
  "timestamp": "2025-12-03T..."
}
```

---

## 📦 SDK Interfaces

### JavaScript Example

```js
import SolBase from "solbase-js";

const client = new SolBase.Client({ apiKey: process.env.SOLBASE_KEY, env: "devnet" });

// Create user wallet
const { wallet_id, pubkey } = await client.wallets.create("user-123");

// Build & sign transfer
const tx = await client.helpers.buildTransferTx({
  from: pubkey,
  to: "RecipientPubkeyHere",
  amountLamports: 1_000_000
});

const signed = await client.wallets.sign(wallet_id, tx.messageBase64);
const result = await client.transactions.send({ signed_tx: signed.signedTxBase64 });

console.log("submitted tx:", result.txid);
```

---

## 🔒 Security

* Private keys never leave the backend or HSM.
* Support for AWS KMS, GCP KMS, Azure KeyVault.
* Encrypted storage for all sensitive data.
* Role-based API access.
* Nonce & replay protection.
* Signed webhook verification.
* Audit logs for all signing events.

---

## 📊 Observability

* RPC latency metrics
* Cache hit ratios
* Webhook delivery status & retries
* Transaction queue depth
* Dashboard for monitoring and debugging

---

## 💵 Pricing Model (Draft)

* **Free / Hobby** — limited wallets, devnet/testnet only.
* **Team** — more wallets, RPC boost, webhook reliability.
* **Business** — dedicated RPC pools, higher SLAs, audit logs.
* **Enterprise** — KMS/HSM integration, custom infra, on‑prem.

---

## 🧪 Local Development

SolBase provides a dev environment that includes:

* Local RPC proxy
* Mock signer
* Webhook simulator
* solana-test-validator integration

---

## 📅 Roadmap

* Full OpenAPI specification
* CLI `solbase dev`
* Expanded SDKs
* Program-specific helpers (Raydium, Pump.fun, Jupiter)
* Dashboard UI

---

## 🤝 Contributing

PRs welcome! Please open issues for bugs, features, or SDK requests.

---

## 📜 License

MIT

---

