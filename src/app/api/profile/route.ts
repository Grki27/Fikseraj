import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { username?: string; bio?: string };
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      username: body.username?.trim() || null,
      bio: body.bio?.trim() || null,
    },
  });
  return NextResponse.json(user);
}
