import { cn } from "@/lib/utils";

type SettingsFieldProps = Readonly<{
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}>;

export function SettingsField({
  label,
  hint,
  children,
  className,
}: SettingsFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </label>
      {children}
      {hint ? <p className="text-[10px] text-muted">{hint}</p> : null}
    </div>
  );
}

export function settingsInputClassName() {
  return cn(
    "w-full rounded-none border border-border-low bg-cream px-2.5 py-2 text-sm text-foreground",
    "placeholder:text-muted focus-visible:border-accent focus-visible:outline-none"
  );
}

export function SettingsToggle({
  label,
  checked,
  onChange,
}: Readonly<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}>) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-none border transition",
          checked
            ? "border-accent bg-accent"
            : "border-border-low bg-cream"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-3.5 w-3.5 bg-foreground transition-transform",
            checked && "translate-x-4 bg-white"
          )}
        />
      </button>
    </label>
  );
}
