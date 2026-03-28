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
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-foreground">Fikseraj</h1>
        <p className="mt-2 text-muted-foreground">
          Prijavite se s Googleom da biste dodavali prijave, glasali i
          uredili profil.
        </p>
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: sp.callbackUrl ?? "/" });
        }}
      >
        <button
          type="submit"
          className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-md hover:bg-primary-hover"
        >
          Nastavi s Googleom
        </button>
      </form>
      {sp.error && (
        <p className="text-sm text-destructive">Prijava nije uspjela.</p>
      )}
    </div>
  );
}
