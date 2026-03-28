import { BrandLogo } from "@/components/brand-logo";

export function ShellHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-5 space-y-4">
      <div
        className="h-1 w-full rounded-full bg-gradient-to-r from-primary to-[#0052A3]"
        aria-hidden
      />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <BrandLogo withText size="md" />
        <div className="min-w-0 space-y-1 pt-1 sm:pt-0 sm:text-right">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
