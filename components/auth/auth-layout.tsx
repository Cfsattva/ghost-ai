const FEATURES = [
  "Describe a system in plain English",
  "Watch AI map it onto a shared canvas",
  "Refine the architecture with collaborators",
  "Generate a technical spec from the result",
];

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen bg-base lg:grid-cols-2">
      <div className="hidden flex-col justify-center gap-8 border-r border-surface-border bg-accent-dim px-16 lg:flex">
        <div className="space-y-2">
          <span className="text-lg font-semibold tracking-tight text-copy-primary">
            ghost
          </span>
          <p className="text-sm text-copy-muted">
            Design systems together, in real time.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-copy-secondary">
          {FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center px-6">{children}</div>
    </div>
  );
}
