"use client";

import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="home-hero mb-6" aria-label="Fikseraj">
      <div className="rounded-3xl border border-border/90 bg-card p-6 shadow-[0_10px_44px_-14px_rgba(0,102,204,0.14)] ring-1 ring-black/5 sm:p-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="home-hero-logo-enter flex justify-center">
            <div
              className={cn(
                "home-hero-float transition-transform duration-300 ease-out",
                "hover:scale-[1.02] active:scale-[0.98]",
              )}
            >
              <BrandLogo withText splitBrand size="xxl" />
            </div>
          </div>

          <h1 className="home-hero-title mx-auto max-w-2xl">
            <span className="block text-2xl font-bold leading-[1.35] tracking-tight text-foreground/95 sm:text-3xl md:text-[2.5rem]">
              Budi dio promjene.
            </span>
            <span className="mt-2 block text-lg font-semibold leading-snug tracking-tight text-sky-400 sm:text-xl md:text-2xl">
              Prijavi svoj problem.
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
