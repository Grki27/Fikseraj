import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  withText?: boolean;
  /** „Fikser“ brend plavo, „aj“ svijetlo plavo */
  splitBrand?: boolean;
  href?: string | null;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
};

const sizes = { sm: 42, md: 54, lg: 68, xl: 88, xxl: 120 };

const brandWordClasses = (size: BrandLogoProps["size"]) =>
  cn(
    "font-extrabold tracking-tight",
    size === "xxl"
      ? "text-4xl sm:text-5xl md:text-6xl"
      : size === "xl"
        ? "text-3xl sm:text-4xl"
        : size === "lg"
          ? "text-2xl sm:text-3xl"
          : "text-xl sm:text-2xl",
  );

export function BrandLogo({
  className,
  withText = false,
  splitBrand = false,
  href = "/",
  size = "md",
}: BrandLogoProps) {
  const px = sizes[size];
  const mark = (
    <Image
      src="/brand/fikseraj-logo.png"
      alt="Fikseraj"
      width={px}
      height={px}
      className="shrink-0 rounded-full object-cover shadow-md ring-1 ring-black/5"
      sizes={`${px}px`}
    />
  );

  const content = (
    <>
      {mark}
      {withText &&
        (splitBrand ? (
          <span className={brandWordClasses(size)}>
            <span className="text-primary">Fikser</span>
            <span className="text-sky-400">aj</span>
          </span>
        ) : (
          <span
            className={cn(
              "font-bold tracking-tight text-foreground",
              size === "xxl"
                ? "text-3xl sm:text-4xl"
                : size === "xl"
                  ? "text-2xl sm:text-3xl"
                  : "text-xl sm:text-2xl",
            )}
          >
            Fikseraj
          </span>
        ))}
    </>
  );

  const rowClass = cn(
    "inline-flex items-center",
    withText
      ? size === "xxl"
        ? "gap-5"
        : size === "xl"
          ? "gap-4"
          : "gap-3"
      : "gap-2.5",
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
