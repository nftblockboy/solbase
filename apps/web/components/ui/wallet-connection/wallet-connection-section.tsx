"use client";

import { useWalletConnection } from "@solana/react-hooks";
import { WalletConnectionFooter } from "./wallet-connection-footer";
import { WalletConnectionHeader } from "./wallet-connection-header";
import { WalletConnectorGrid } from "./wallet-connector-grid";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

type WalletConnectionSectionProps = Readonly<{
  title?: string;
  description?: string;
  className?: string;
}>;

export function WalletConnectionSection({
  title,
  description,
  className
}: WalletConnectionSectionProps) {
  const { connectors, connect, disconnect, status, wallet, isReady } =
    useWalletConnection();

  const address =
    status === "connected" ? wallet?.account.address.toString() ?? null : null;
  const activeConnectorId =
    status === "connected" ? wallet?.connector.id : undefined;

  if (!isReady) {
    return null;
  }

  return (
    <Surface
      as="section"
      variant="card"
      className={cn("w-full max-w-3xl space-y-4 p-6", className)}
    >
      <WalletConnectionHeader
        title={title}
        description={description}
        status={status}
      />
      <WalletConnectorGrid
        connectors={connectors}
        status={status}
        activeConnectorId={activeConnectorId}
        onConnect={(connectorId) => void connect(connectorId)}
      />
      <WalletConnectionFooter
        address={address}
        onDisconnect={() => void disconnect()}
        disconnectDisabled={status !== "connected"}
      />
    </Surface>
  );
}
