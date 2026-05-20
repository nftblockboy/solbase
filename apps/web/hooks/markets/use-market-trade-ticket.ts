"use client";

import { useCallback, useState } from "react";
import type { TradeTicketDraft, TradeTicketSide } from "@/lib/positions/types";

export function useMarketTradeTicket() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<TradeTicketDraft | null>(null);

  const openTicket = useCallback((next: TradeTicketDraft) => {
    setDraft(next);
    setOpen(true);
  }, []);

  const closeTicket = useCallback(() => {
    setOpen(false);
  }, []);

  const openTicketSide = useCallback(
    (
      side: TradeTicketSide,
      base: Omit<TradeTicketDraft, "side">
    ) => {
      openTicket({ ...base, side });
    },
    [openTicket]
  );

  return {
    open,
    setOpen,
    draft,
    openTicket,
    openTicketSide,
    closeTicket,
  };
}
