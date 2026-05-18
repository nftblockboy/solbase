import type { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren<
  Readonly<{
    title: string;
  }>
>;

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <section>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
