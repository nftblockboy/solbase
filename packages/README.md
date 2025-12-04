## TODO:

```
├── packages/
│   ├── solbase-sdk-js/          # JS/TS SDK
│   │   ├── src/
│   │   │   ├── client/
│   │   │   ├── wallets/
│   │   │   ├── rpc/
│   │   │   ├── subscriptions/
│   │   │   ├── helpers/
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── solbase-core/            # Shared logic across services
│   │   ├── crypto/              # Signing, KMS wrappers, key mgmt
│   │   ├── rpc/                 # RPC clients, retry handlers, pooling
│   │   ├── validator/           # Input schemas (Zod or Valibot)
│   │   ├── events/              # Webhook signing, delivery utils
│   │   ├── constants/
│   │   ├── types/
│   │   ├── index.ts
│   │   └── package.json
│   │
│   ├── solbase-openapi/         # OpenAPI spec + generated clients???
│   │   ├── openapi.yaml
│   │   ├── generated/
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── solbase-utils/           # Shared helpers: logging, env, base errors
│       ├── logger.ts
│       ├── env.ts
│       ├── error.ts
│       ├── time.ts
│       ├── package.json
```