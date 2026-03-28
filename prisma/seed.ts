import { PrismaClient, IssueStatus } from "@prisma/client";
import { buildDummyIssueData } from "./dummy-issues-hr";

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
      category: "PROMET" as const,
      lat: 45.8157,
      lng: 15.9785,
      addressText: "Dolac, 10000 Zagreb",
      upvoteCount: 12,
      resolveCount: 3,
    },
    {
      title: "Puklo ulično osvjetljenje u Tkalčićevoj",
      description:
        "Stubić lampe je polomljen, žica vidljiva — sigurnosni rizik.",
      category: "KOMUNALNI" as const,
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
      category: "OKOLIS" as const,
      lat: 45.7831,
      lng: 15.9002,
      addressText: "Jarun, Zagreb",
      upvoteCount: 2,
      resolveCount: 0,
    },
    {
      title: "Big pothole on Savska cesta",
      description:
        "A large pothole has formed on Savska cesta, creating a hazard for drivers, cyclists, and pedestrians. It should be fixed as soon as possible.",
      category: "PROMET" as const,
      lat: 45.802,
      lng: 15.968,
      addressText: "Savska cesta, Zagreb",
      upvoteCount: 99,
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

  const removed = await prisma.issue.deleteMany({
    where: { title: { startsWith: "[DEMO]" } },
  });
  if (removed.count > 0) {
    console.log(`Uklonjeno starih [DEMO] prijava: ${removed.count}`);
  }

  const dummy = buildDummyIssueData(user.id);
  const created = await prisma.issue.createMany({ data: dummy });
  console.log(`Dodano demo prijava: ${created.count}`);

  const pothole = await prisma.issue.updateMany({
    where: {
      title: {
        in: ["Big pothole on Savska cesta", "Big pothole in savska ulica"],
      },
    },
    data: { upvoteCount: 99 },
  });
  if (pothole.count > 0) {
    console.log(
      `Ažurirano upvoteCount=99 za Savska pothole prijave (${pothole.count})`,
    );
  }

  const trafficLight = await prisma.issue.updateMany({
    where: { title: "Traffic light not working" },
    data: { upvoteCount: 99 },
  });
  if (trafficLight.count > 0) {
    console.log(
      `Ažurirano upvoteCount=99 za: Traffic light not working (${trafficLight.count})`,
    );
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
