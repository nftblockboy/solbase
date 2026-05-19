import type { WalletConnector } from "@solana/client";
import { WalletConnectorCard } from "./wallet-connector-card";

type WalletConnectorGridProps = Readonly<{
  connectors: readonly WalletConnector[];
  status: "connected" | "connecting" | "disconnected" | "error";
  activeConnectorId?: string;
  onConnect: (connectorId: string) => void;
  className?: string;
}>;

export function WalletConnectorGrid({
  connectors,
  status,
  activeConnectorId,
  onConnect,
  className
}: WalletConnectorGridProps) {
  return (
    <div
      className={["grid gap-3 sm:grid-cols-2", className].filter(Boolean).join(" ")}
    >
      {connectors.map((connector) => (
        <WalletConnectorCard
          key={connector.id}
          connector={connector}
          status={status}
          isActive={activeConnectorId === connector.id}
          disabled={status === "connecting"}
          onConnect={onConnect}
        />
      ))}
    </div>
  );
}
