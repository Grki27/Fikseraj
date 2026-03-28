"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, List, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Karta", icon: Map },
  { href: "/issues", label: "Lista", icon: List },
  { href: "/profile", label: "Profil", icon: User },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md safe-area-pb">
      <div className="mx-auto flex max-w-lg justify-around px-2 py-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-4 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
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
