import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DESCRIPTION_MAX_LENGTH } from "@/lib/constants";
import { IssueCategory, IssueStatus, Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const forMap = sp.get("map") === "1";
  const category = sp.get("category") as IssueCategory | null;
  const statusFilter = sp.get("status") as IssueStatus | "ALL" | "ACTIVE" | null;
  const sort = sp.get("sort") || "popular";

  const where: Prisma.IssueWhereInput = {};

  if (forMap) {
    where.status = { not: IssueStatus.RESOLVED };
  }

  if (category && Object.values(IssueCategory).includes(category)) {
    where.category = category;
  }

  if (statusFilter && statusFilter !== "ALL") {
    if (statusFilter === "ACTIVE") {
      where.status = { not: IssueStatus.RESOLVED };
    } else if (Object.values(IssueStatus).includes(statusFilter as IssueStatus)) {
      where.status = statusFilter as IssueStatus;
    }
  }

  const orderBy: Prisma.IssueOrderByWithRelationInput[] =
    sort === "newest"
      ? [{ createdAt: "desc" }]
      : [{ upvoteCount: "desc" }, { createdAt: "desc" }];

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    include: {
      author: { select: { id: true, name: true, image: true } },
    },
    take: 200,
  });

  return NextResponse.json(issues);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    title?: string;
    description?: string;
    category?: IssueCategory;
    customCategory?: string | null;
    lat?: number;
    lng?: number;
    addressText?: string | null;
    imageUrl?: string | null;
  };

  const title = body.title?.trim();
  const description = body.description?.trim();
  if (!title || !description) {
    return NextResponse.json(
      { error: "title and description required" },
      { status: 400 },
    );
  }
  if (description.length > DESCRIPTION_MAX_LENGTH) {
    return NextResponse.json(
      { error: `description max ${DESCRIPTION_MAX_LENGTH} chars` },
      { status: 400 },
    );
  }
  if (
    body.lat == null ||
    body.lng == null ||
    typeof body.lat !== "number" ||
    typeof body.lng !== "number"
  ) {
    return NextResponse.json({ error: "location required" }, { status: 400 });
  }
  const category = body.category;
  if (!category || !Object.values(IssueCategory).includes(category)) {
    return NextResponse.json({ error: "invalid category" }, { status: 400 });
  }
  if (category === IssueCategory.OSTALO && !body.customCategory?.trim()) {
    return NextResponse.json(
      { error: "customCategory for Ostalo" },
      { status: 400 },
    );
  }

  const issue = await prisma.issue.create({
    data: {
      title,
      description,
      category,
      customCategory:
        category === IssueCategory.OSTALO ? body.customCategory?.trim() : null,
      lat: body.lat,
      lng: body.lng,
      addressText: body.addressText?.trim() || null,
      imageUrl: body.imageUrl || null,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(issue);
}
