## TODO:

```graphql
├── apps/
│   ├── api/                     # Main REST API service
│   │   ├── src/
│   │   │   ├── config/          # Environment, constants, schema validation
│   │   │   ├── routes/          # REST route definitions
│   │   │   ├── controllers/     # Request handlers
│   │   │   ├── services/        # Business logic (RPC, wallets, signing, subs)
│   │   │   ├── workers/         # Background jobs (webhook retry, tx queue)
│   │   │   ├── lib/             # Shared utils (encoding, solana helpers)
│   │   │   ├── middleware/      # Auth, rate limit, validation, error handling
│   │   │   ├── db/              # Prisma/Drizzle/Mongo models or KV layer
│   │   │   ├── server.ts
│   │   │   └── app.ts
│   │   ├── tests/
│   │   ├── go.mod
│   │   └── go.sum
│   │
│   ├── dashboard/               # (Later) UI for metrics & monitoring
│   │   └── ...
│   │
│   └── cli/                     # solbase CLI tool: `solbase dev`, `solbase local`
│       ├── bin/
│       ├── commands/
│       ├── utils/
│   │   ├── go.mod
│   │   └── go.sum
```