import { IssueCategory, IssueStatus } from "@prisma/client";

export const categoryLabel: Record<IssueCategory, string> = {
  PROMET: "Promet",
  KOMUNALNI: "Komunalni problemi",
  OKOLIS: "Okoliš",
  OSTALO: "Ostalo",
};

export const statusLabel: Record<IssueStatus, string> = {
  SUBMITTED: "Poslano",
  SENT_TO_HOLDING: "Poslano Zagreb Holding-u",
  RESOLVED: "Riješeno",
};
