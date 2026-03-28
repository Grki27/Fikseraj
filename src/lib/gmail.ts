import { google } from "googleapis";
import { appBaseUrl, getUpvoteEmailThreshold } from "@/lib/constants";

function getOAuth2Client() {
  const id = process.env.GMAIL_OAUTH_CLIENT_ID;
  const secret = process.env.GMAIL_OAUTH_CLIENT_SECRET;
  const refresh = process.env.GMAIL_REFRESH_TOKEN;
  if (!id || !secret || !refresh) {
    throw new Error("Gmail OAuth env missing (GMAIL_OAUTH_CLIENT_ID, GMAIL_OAUTH_CLIENT_SECRET, GMAIL_REFRESH_TOKEN)");
  }
  const o = new google.auth.OAuth2(id, secret);
  o.setCredentials({ refresh_token: refresh });
  return o;
}

export async function sendHoldingAlertEmail(params: {
  issueId: string;
  title: string;
  description: string;
  addressText: string | null;
  upvoteCount: number;
}) {
  const from = process.env.GMAIL_SENDER_EMAIL;
  const to = process.env.ZAGREB_HOLDING_EMAIL;
  if (!from || !to) {
    throw new Error("GMAIL_SENDER_EMAIL or ZAGREB_HOLDING_EMAIL missing");
  }

  const base = appBaseUrl();
  const threshold = getUpvoteEmailThreshold();
  const link = `${base}/issues/${params.issueId}`;
  const subject = `[Fikseraj] High Priority Issue: ${params.title}`;
  const body = [
    `A problem has reached significant public attention (${threshold}+ upvotes).`,
    ``,
    `Title:`,
    params.title,
    ``,
    `Description:`,
    params.description,
    ``,
    `Location:`,
    params.addressText || "—",
    ``,
    `Upvotes:`,
    String(params.upvoteCount),
    ``,
    `View issue:`,
    link,
  ].join("\n");

  const auth = getOAuth2Client();
  const gmail = google.gmail({ version: "v1", auth });
  const raw = Buffer.from(
    `To: ${to}\r\nFrom: ${from}\r\nSubject: ${subject}\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n${body}`,
    "utf8",
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}
