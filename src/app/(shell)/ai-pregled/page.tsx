import { AiOverviewDashboard } from "@/components/ai-overview-dashboard";

export const metadata = {
  title: "AI pregled — Fikseraj",
  description: "Sažetak prijava i statistike za Zagreb (Gemini).",
};

export default function AiPregledPage() {
  return (
    <div className="pb-4">
      <AiOverviewDashboard />
    </div>
  );
}
