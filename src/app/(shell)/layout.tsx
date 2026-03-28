import { SiteNav } from "@/components/site-nav";
import { SubmitIssueFab } from "@/components/submit-issue-fab";

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto min-h-dvh max-w-3xl px-4 pb-28 pt-3 sm:px-5">
        {children}
      </div>
      <SubmitIssueFab />
      <SiteNav />
    </>
  );
}
