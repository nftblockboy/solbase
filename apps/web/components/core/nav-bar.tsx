"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { WalletConnectButton } from "../ui/wallet-connection/wallet-connect-button";

const navLinks = [
  { href: "/swap", label: "Swap" },
  { href: "/predict", label: "Predict" }
] as const;

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full items-center justify-between border-b border-border bg-background px-4 py-2">
      <div className="flex items-center justify-start space-x-6">
        <Link href="/" className="flex items-center space-x-2" aria-label="Home">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#7C3AED" />
            <path d="M10 17.5L16 8L22 17.5H10Z" fill="white" />
            <circle cx="12" cy="21" r="2" fill="white" />
          </svg>
        </Link>

        <ul className="flex space-x-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "font-medium transition",
                  pathname === href
                    ? "text-accent"
                    : "text-foreground/80 hover:text-accent"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <WalletConnectButton />
      </div>
    </nav>
  );
}
