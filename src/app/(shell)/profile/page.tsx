import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/profile-form";
import Image from "next/image";
import Link from "next/link";
import { statusLabel, categoryLabel } from "@/lib/labels";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/profile");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      issues: {
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          id: true,
          title: true,
          upvoteCount: true,
          resolveCount: true,
          status: true,
          category: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Moj profil</h1>
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        {user.image && (
          <Image
            src={user.image}
            alt=""
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <ProfileForm
        initialUsername={user.username ?? ""}
        initialBio={user.bio ?? ""}
      />
      <section>
        <h2 className="mb-3 text-lg font-semibold">Moje prijave</h2>
        <ul className="space-y-2">
          {user.issues.map((i) => (
            <li key={i.id}>
              <Link
                href={`/issues/${i.id}`}
                className="block rounded-lg border border-border bg-card px-3 py-2 hover:ring-2 hover:ring-primary/20"
              >
                <p className="font-medium">{i.title}</p>
                <p className="text-xs text-muted-foreground">
                  {categoryLabel[i.category]} · {statusLabel[i.status]} · ↑{" "}
                  {i.upvoteCount} · ✓ {i.resolveCount}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        {user.issues.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Još nema vaših prijava.
          </p>
        )}
      </section>
    </div>
  );
}
