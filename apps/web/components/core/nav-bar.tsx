"use client";

import { WalletConnectButton } from "../ui/wallet-connection/wallet-connect-button";

export function NavBar() {  return (
<nav className="flex items-center justify-between py-2 px-4 bg-white">


<div className="flex items-center justify-start space-x-2">
  <div className="flex items-center space-x-2">
    <svg width="24" height="24" viewBox="0 0 24 24" className="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#7C3AED" />
      <path d="M10 17.5L16 8L22 17.5H10Z" fill="white" />
      <circle cx="12" cy="21" r="2" fill="white" />
    </svg>
    <span className="text-lg font-bold text-gray-900">AI Crypto Wallet Monitor</span>
  </div>

  <ul className="flex space-x-6">
    <li>
      <a href="#" className="text-slate-700 hover:text-purple-600 font-medium transition">Dashboard</a>
    </li>
    <li>
      <a href="#" className="text-slate-700 hover:text-purple-600 font-medium transition">Assets</a>
    </li>
    <li>
      <a href="#" className="text-slate-700 hover:text-purple-600 font-medium transition">Analytics</a>
    </li>
    <li>
      <a href="#" className="text-slate-700 hover:text-purple-600 font-medium transition">Transfer</a>
    </li>
  </ul>
</div>

<div className="flex items-center space-x-2">
  <span className="hidden sm:inline text-sm text-gray-700">v1.0</span>
  <WalletConnectButton />
</div>

</nav>
  );
}