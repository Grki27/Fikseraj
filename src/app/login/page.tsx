import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const session = await auth();
  const sp = await searchParams;
  if (session?.user) {
    redirect(sp.callbackUrl ?? "/");
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="relative bg-gradient-to-br from-primary to-[#0052A3] px-6 pb-14 pt-12 text-center text-white">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <img
            src="/brand/fikseraj-logo.svg"
            alt=""
            width={88}
            height={88}
            className="drop-shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Fikseraj
            </h1>
            <p className="mt-2 text-base text-white/90">
              Prijavite se s Googleom da biste dodavali prijave, glasali i
              uredili profil.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center px-4 pb-10 pt-0">
        <div className="-mt-8 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: sp.callbackUrl ?? "/" });
            }}
            className="flex flex-col gap-4"
          >
            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-md transition hover:bg-primary-hover"
            >
              Nastavi s Googleom
            </button>
            {sp.error && (
              <p className="text-center text-sm text-destructive">
                Prijava nije uspjela.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
