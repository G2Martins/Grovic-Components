import { redirect } from "next/navigation";
import { ExportStatus } from "@/components/export-status";
import { GlobalTimerProvider } from "@/components/global-timer-provider";
import { Header } from "@/components/header";
import { GlobalSheetsProvider } from "@/components/sheets/global-sheets-provider";
import { Sidebar } from "@/components/sidebar";
import { TimezoneDetector } from "@/components/timezone-detector";
import { TrialGuard } from "@/components/trial-guard";
import {
  batchPrefetch,
  getQueryClient,
  HydrateClient,
  trpc,
} from "@/trpc/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const isMockAuth = process.env.MOCK_AUTH === "true";

  // NOTE: These are used in the global sheets
  if (!isMockAuth) {
    batchPrefetch([
      trpc.team.current.queryOptions(),
      trpc.invoice.defaultSettings.queryOptions(),
      trpc.search.global.queryOptions({ searchTerm: "" }),
    ]);
  }

  const user = isMockAuth
    ? {
        fullName: "Demo User",
        teamId: "mock-team-id",
        team: { plan: "starter", createdAt: "2025-01-01T00:00:00Z", canceledAt: null },
      }
    : await queryClient
        .fetchQuery(trpc.user.me.queryOptions())
        .catch(() => redirect("/login"));

  if (!isMockAuth) {
    if (!user) redirect("/login");
    if (!user.fullName || !user.teamId) redirect("/onboarding");

    const ONBOARDING_ENFORCEMENT_DATE = "2026-03-24T00:00:00.000Z";
    if (
      user.team?.plan === "trial" &&
      user.team?.createdAt &&
      !user.team?.canceledAt &&
      new Date(user.team.createdAt) >= new Date(ONBOARDING_ENFORCEMENT_DATE)
    ) {
      redirect("/onboarding?s=start-trial");
    }
  }

  return (
    <HydrateClient>
      <div className="relative">
        <Sidebar />

        <div className="md:ml-[70px] pb-4">
          <Header />
          <TrialGuard plan={user.team?.plan} createdAt={user.team?.createdAt}>
            <div className="px-4 md:px-8">{children}</div>
          </TrialGuard>
        </div>

        <ExportStatus />
        <GlobalSheetsProvider />
        <GlobalTimerProvider />
        <TimezoneDetector />
      </div>
    </HydrateClient>
  );
}
