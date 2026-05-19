export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, color-mix(in srgb, var(--primary) 14%, transparent), transparent 55%),
            radial-gradient(ellipse 70% 45% at 85% 75%, color-mix(in srgb, var(--primary) 10%, transparent), transparent 50%),
            var(--background)
          `,
        }}
      />
      <div className="absolute -left-[10%] top-[5%] size-[min(55vw,420px)] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-[5%] bottom-[10%] size-[min(50vw,380px)] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute left-[40%] top-[55%] size-[min(40vw,300px)] rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
}
