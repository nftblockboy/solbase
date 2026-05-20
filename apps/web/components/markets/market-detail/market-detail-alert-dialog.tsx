"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/motion-primitives/dialog";
import type { MarketAlert } from "@/hooks/markets/use-market-local-prefs";

type MarketDetailAlertDialogProps = Readonly<{
  marketTitle: string;
  alerts: MarketAlert[];
  onAddAlert: (input: { thresholdPct?: number; note?: string }) => void;
  onRemoveAlert: (id: string) => void;
  trigger: React.ReactElement;
}>;

export function MarketDetailAlertDialog({
  marketTitle,
  alerts,
  onAddAlert,
  onRemoveAlert,
  trigger,
}: MarketDetailAlertDialogProps) {
  const [open, setOpen] = useState(false);
  const [threshold, setThreshold] = useState("");
  const [note, setNote] = useState("");

  const handleSave = () => {
    const thresholdPct = threshold.trim() ? Number(threshold) : undefined;
    onAddAlert({
      thresholdPct: Number.isFinite(thresholdPct) ? thresholdPct : undefined,
      note: note.trim() || undefined,
    });
    setThreshold("");
    setNote("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <span onClick={() => setOpen(true)} role="presentation">
        {trigger}
      </span>
      <DialogContent className="w-full max-w-md p-4">
        <DialogHeader>
          <DialogTitle>Price alert (local)</DialogTitle>
          <DialogDescription className="text-xs">
            Saved on this device only — {marketTitle}
          </DialogDescription>
        </DialogHeader>
        <DialogClose />
        <div className="mt-4 space-y-3">
          <label className="block text-xs text-muted">
            Threshold % (optional)
            <input
              type="number"
              min={0}
              max={100}
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="mt-1 w-full rounded-none border border-border bg-background px-2 py-1.5 text-sm text-foreground"
              placeholder="e.g. 65"
            />
          </label>
          <label className="block text-xs text-muted">
            Note
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-none border border-border bg-background px-2 py-1.5 text-sm text-foreground"
              placeholder="Desk reminder…"
            />
          </label>
          <button
            type="button"
            onClick={handleSave}
            className="w-full rounded-none bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            Save alert (local only)
          </button>
          {alerts.length > 0 ? (
            <ul className="max-h-32 space-y-1 overflow-y-auto border-t border-border-low pt-2 text-xs">
              {alerts.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-2">
                  <span className="text-muted">
                    {a.thresholdPct != null ? `${a.thresholdPct}%` : "Any move"}
                    {a.note ? ` · ${a.note}` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveAlert(a.id)}
                    className="text-accent hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
