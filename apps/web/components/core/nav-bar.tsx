"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SettingsGearButton } from "@/components/settings";
import { ThemeToggle } from "./theme-toggle";
import { WalletConnectButton } from "../ui/wallet-connection/wallet-connect-button";
import { Surface } from "@/components/ui/surface";

const navLinks = [
  { href: "/markets", label: "Markets" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/community", label: "Community" },
] as const;

function isNavActive(pathname: string, href: string) {
  if (href === "/leaderboard") {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`) ||
      pathname.startsWith("/trader/")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavBar() {
  const pathname = usePathname();

  return (
    <Surface
      as="nav"
      variant="chrome"
      className="flex w-full min-w-0 items-center justify-between gap-2 px-2 py-2 sm:px-4"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <Link
          href="/markets"
          className="flex shrink-0 items-center"
          aria-label="Solbase home"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#7C3AED" />
            <path d="M10 17.5L16 8L22 17.5H10Z" fill="white" />
            <circle cx="12" cy="21" r="2" fill="white" />
          </svg>
        </Link>

        <ul
          className={cn(
            "flex min-w-0 flex-1 items-center gap-3 overflow-x-auto",
            "scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden"
          )}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                className={cn(
                  "whitespace-nowrap text-sm font-medium transition sm:text-base",
                  isNavActive(pathname, href)
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

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <ThemeToggle />
        <SettingsGearButton />
        <WalletConnectButton />
      </div>
    </Surface>
  );
}
