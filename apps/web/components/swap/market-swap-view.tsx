"use client";

import type { MockToken } from "./mock-tokens";
import { SwapDirectionToggle } from "./swap-direction-toggle";
import { SwapPrimaryAction } from "./swap-primary-action";
import { TokenAmountPanel } from "./token-amount-panel";

type MarketSwapViewProps = Readonly<{
  sellToken: MockToken;
  buyToken: MockToken;
  sellAmount: string;
  onSellAmountChange: (value: string) => void;
  onFlip: () => void;
}>;

function parseAmount(value: string): number {
  const parsed = Number.parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function MarketSwapView({
  sellToken,
  buyToken,
  sellAmount,
  onSellAmountChange,
  onFlip,
}: MarketSwapViewProps) {
  const sellNumeric = parseAmount(sellAmount);
  const sellUsd = sellNumeric * sellToken.priceUsd;
  const buyUsd = 0;

  return (
    <div className="space-y-0">
      <TokenAmountPanel
        label="Sell"
        token={sellToken}
        value={sellAmount}
        onValueChange={onSellAmountChange}
        usdValue={sellUsd}
      />

      <SwapDirectionToggle onFlip={onFlip} />

      <TokenAmountPanel
        label="Buy"
        token={buyToken}
        readOnly
        usdValue={buyUsd}
        showPasteCa
      />

      <div className="pt-3">
        <SwapPrimaryAction sellAmount={sellAmount} />
      </div>
    </div>
  );
}
