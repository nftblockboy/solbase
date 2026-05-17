import type { WalletConnector } from "@solana/client";

type WalletConnectorCardProps = Readonly<{
  connector: WalletConnector;
  status: "connected" | "connecting" | "disconnected" | "error";
  isActive: boolean;
  disabled?: boolean;
  onConnect: (connectorId: string) => void;
}>;

function connectorStatusLabel(
  status: WalletConnectorCardProps["status"],
  isActive: boolean
) {
  if (status === "connecting") return "Connecting…";
  if (status === "connected" && isActive) return "Active";
  return "Tap to connect";
}

export function WalletConnectorCard({
  connector,
  status,
  isActive,
  disabled = false,
  onConnect
}: WalletConnectorCardProps) {
  return (
    <button
      type="button"
      onClick={() => onConnect(connector.id)}
      disabled={disabled}
      className="group flex items-center justify-between rounded-xl border border-border-low bg-card px-4 py-3 text-left text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="flex flex-col">
        <span className="text-base">{connector.name}</span>
        <span className="text-xs text-muted">
          {connectorStatusLabel(status, isActive)}
        </span>
      </span>
      <span
        aria-hidden
        className="h-2.5 w-2.5 rounded-full bg-border-low transition group-hover:bg-primary/80"
      />
    </button>
  );
}
