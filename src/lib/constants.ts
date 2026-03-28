/** Approximate Zagreb center */
export const ZAGREB_CENTER = { lat: 45.815, lng: 15.9819 };

export const DESCRIPTION_MAX_LENGTH = 500;

export function getUpvoteEmailThreshold() {
  return Number(process.env.UPVOTE_EMAIL_THRESHOLD ?? "100");
}

export function getResolveVoteThreshold() {
  return Number(process.env.RESOLVE_VOTE_THRESHOLD ?? "50");
}

export function appBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    process.env.VERCEL_URL?.replace(/^(?!http)/, "https://") ||
    "http://localhost:3000"
  );
}
