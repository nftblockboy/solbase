"use client";

import { useEffect } from "react";
import { useWalletConnection } from "@solana/react-hooks";
import { WalletConnectionFooter } from "./wallet-connection-footer";
import { WalletConnectionHeader } from "./wallet-connection-header";
import { WalletConnectorGrid } from "./wallet-connector-grid";

type WalletConnectionDialogContentProps = Readonly<{
  title?: string;
  description?: string;
  className?: string;
  onConnected?: () => void;
}>;

export function WalletConnectionDialogContent({
  title,
  description,
  className,
  onConnected
}: WalletConnectionDialogContentProps) {
  const { connectors, connect, disconnect, status, wallet, isReady } =
    useWalletConnection();

  const address =
    status === "connected" ? wallet?.account.address.toString() ?? null : null;
  const activeConnectorId =
    status === "connected" ? wallet?.connector.id : undefined;

  useEffect(() => {
    if (status === "connected") {
      onConnected?.();
    }
  }, [status, onConnected]);

  if (!isReady) {
    return null;
  }

  return (
    <div className={["w-full space-y-4", className].filter(Boolean).join(" ")}>
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
    </div>
  );
}
