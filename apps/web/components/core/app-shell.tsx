import type { PropsWithChildren } from "react";
import { AmbientBackground } from "./ambient-background";
import { NavBar } from "./nav-bar";
import { SiteFooter } from "./site-footer";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <>
      <AmbientBackground />
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <NavBar />
        <main className="flex w-full flex-1 flex-col items-stretch px-4 pt-2 pb-4">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
