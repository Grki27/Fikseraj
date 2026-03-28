import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  withText?: boolean;
  href?: string | null;
  size?: "sm" | "md" | "lg";
};

const sizes = { sm: 36, md: 44, lg: 56 };

export function BrandLogo({
  className,
  withText = false,
  href = "/",
  size = "md",
}: BrandLogoProps) {
  const px = sizes[size];
  const mark = (
    <img
      src="/brand/fikseraj-logo.svg"
      alt=""
      width={px}
      height={px}
      className="shrink-0"
    />
  );

  const content = (
    <>
      {mark}
      {withText && (
        <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Fikseraj
        </span>
      )}
    </>
  );

  const rowClass = cn(
    "inline-flex items-center gap-2.5",
    withText && "gap-3",
    className,
  );

  if (href === null) {
    return <span className={rowClass}>{content}</span>;
  }

  return (
    <Link
      href={href}
      className={cn(
        rowClass,
        "rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      )}
    >
      {content}
    </Link>
  );
}
