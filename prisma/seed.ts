import {
  PrismaClient,
  IssueCategory,
  IssueStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@fikseraj.app" },
    update: {},
    create: {
      email: "demo@fikseraj.app",
      name: "Demo korisnik",
    },
  });

  const samples = [
    {
      title: "Rupa u kolniku kod tržnice Dolac",
      description:
        "Duboka rupa uz rub kolnika uzrokuje udare. Treba hitno asfaltiranje.",
      category: IssueCategory.PROMET,
      lat: 45.8157,
      lng: 15.9785,
      addressText: "Dolac, 10000 Zagreb",
      upvoteCount: 12,
      resolveCount: 3,
    },
    {
      title: "Puklo ulično osvjetljenje u Tkalčićevoj",
      description: "Stubić lampe je polomljen, žica vidljiva — sigurnosni rizik.",
      category: IssueCategory.KOMUNALNI,
      lat: 45.8175,
      lng: 15.9734,
      addressText: "Tkalčićeva, Zagreb",
      upvoteCount: 5,
      resolveCount: 1,
    },
    {
      title: "Naglomila kanta za smeće u parku",
      description:
        "Preglomila kanta u parku na jarunu — otpad se širi okolo.",
      category: IssueCategory.OKOLIS,
      lat: 45.7831,
      lng: 15.9002,
      addressText: "Jarun, Zagreb",
      upvoteCount: 2,
      resolveCount: 0,
    },
  ];

  for (const s of samples) {
    const ex = await prisma.issue.findFirst({
      where: { title: s.title },
    });
    if (ex) continue;
    await prisma.issue.create({
      data: {
        ...s,
        authorId: user.id,
        status: IssueStatus.SUBMITTED,
        sentToHoldingEmail: false,
      },
    });
  }

  console.log("Seed gotov.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    void prisma.$disconnect();
    process.exit(1);
  });
