type WalletConnectionFooterProps = Readonly<{
  address: string | null;
  onDisconnect: () => void;
  disconnectDisabled?: boolean;
  className?: string;
}>;

export function WalletConnectionFooter({
  address,
  onDisconnect,
  disconnectDisabled = false,
  className
}: WalletConnectionFooterProps) {
  return (
    <div
      className={[
        "flex flex-wrap items-center gap-3 border-t border-border-low pt-4 text-sm",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="rounded-none border border-border-low bg-cream px-3 py-2 font-mono text-xs">
        {address ?? "No wallet connected"}
      </span>
      <button
        type="button"
        onClick={onDisconnect}
        disabled={disconnectDisabled}
        className="inline-flex items-center gap-2 rounded-none border border-border-low bg-card px-3 py-2 font-medium transition hover:-translate-y-0.5 hover:shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        Disconnect
      </button>
    </div>
  );
}
