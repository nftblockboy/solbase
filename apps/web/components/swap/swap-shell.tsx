"use client";

import { useState } from "react";
import { LimitSwapPlaceholder } from "./limit-swap-placeholder";
import { MarketSwapView } from "./market-swap-view";
import { MOCK_SOL, MOCK_USDC, type MockToken } from "./mock-tokens";
import { RecurringSwapPlaceholder } from "./recurring-swap-placeholder";
import { SwapCard } from "./swap-card";
import { SwapModeTabs, type SwapMode } from "./swap-mode-tabs";
import { SwapUtilityRow } from "./swap-utility-row";
import { TokenInfoCard } from "./token-info-card";

export function SwapShell() {
  const [mode, setMode] = useState<SwapMode>("market");
  const [sellToken, setSellToken] = useState<MockToken>(MOCK_USDC);
  const [buyToken, setBuyToken] = useState<MockToken>(MOCK_SOL);
  const [sellAmount, setSellAmount] = useState("");

  function handleFlip() {
    setSellToken(buyToken);
    setBuyToken(sellToken);
    setSellAmount("");
  }

  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col gap-3 py-4">
      <SwapCard className="space-y-3">
        <SwapModeTabs mode={mode} onModeChange={setMode} />

        {mode === "market" ? (
          <MarketSwapView
            sellToken={sellToken}
            buyToken={buyToken}
            sellAmount={sellAmount}
            onSellAmountChange={setSellAmount}
            onFlip={handleFlip}
          />
        ) : null}

        {mode === "limit" ? <LimitSwapPlaceholder /> : null}
        {mode === "recurring" ? <RecurringSwapPlaceholder /> : null}
      </SwapCard>

      <SwapUtilityRow />

      <div className="grid grid-cols-2 gap-2">
        <TokenInfoCard token={sellToken} />
        <TokenInfoCard token={buyToken} />
      </div>
    </div>
  );
}
