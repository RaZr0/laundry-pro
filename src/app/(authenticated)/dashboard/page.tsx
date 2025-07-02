import { Page } from "@/components/page";
import { StatsOverview } from "./_components/stats-overview/stats-overview";

export default function Dashboard() {
  return (
    <Page title="התובנות שלי">
      <StatsOverview />
    </Page>
  );
}
