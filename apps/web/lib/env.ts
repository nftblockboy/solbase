type AppEnv = Readonly<{
  openAiApiKey: string | null;
  solanaRpcUrl: string;
}>;

export function getAppEnv(): AppEnv {
  return {
    openAiApiKey: process.env.OPENAI_API_KEY ?? null,
    solanaRpcUrl: process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com"
  };
}
