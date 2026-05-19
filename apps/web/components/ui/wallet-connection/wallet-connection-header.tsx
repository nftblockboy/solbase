type WalletConnectionHeaderProps = Readonly<{
  title?: string;
  description?: string;
  status: "connected" | "connecting" | "disconnected" | "error";
  className?: string;
}>;

export function WalletConnectionHeader({
  title = "Wallet connection",
  description = "Pick any discovered connector and manage connect / disconnect in one spot.",
  status,
  className
}: WalletConnectionHeaderProps) {
  return (
    <div
      className={["flex items-start justify-between gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="space-y-1">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-muted">{description}</p>
      </div>
      <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground/80">
        {status === "connected" ? "Connected" : "Not connected"}
      </span>
    </div>
  );
}
