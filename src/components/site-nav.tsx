"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, List, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Karta", icon: Map },
  { href: "/issues", label: "Lista", icon: List },
  { href: "/profile", label: "Profil", icon: User },
  { href: "/ai-pregled", label: "AI pregled", icon: Sparkles },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 shadow-[0_-4px_24px_rgba(26,29,46,0.08)] backdrop-blur-md safe-area-pb">
      <div className="mx-auto flex max-w-lg justify-around gap-0 px-0.5 py-2 sm:px-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : href === "/ai-pregled"
                ? pathname === "/ai-pregled"
                : pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-0 max-w-[5.5rem] flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-center text-[10px] font-semibold leading-tight transition-[colors,transform] duration-200 active:scale-95 sm:min-w-[4.25rem] sm:px-2 sm:text-xs",
                active
                  ? "bg-accent text-primary"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              <Icon className="size-6" strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
