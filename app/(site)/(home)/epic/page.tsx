import type { Metadata } from "next";
import { Toaster } from "@/registry/default/ui/sonner";
import { AgendaCard } from "./cards/agenda";
import { BookDeskCard } from "./cards/book-desk";
import { BookSlotCard } from "./cards/book-slot";
import { CallLogCard } from "./cards/call-log";
import { CallerVerifyCard } from "./cards/caller-verify";
import { CourseCard } from "./cards/course";
import { DispatchCard } from "./cards/dispatch";
import { InboxCard } from "./cards/inbox";
import { IntakeCard } from "./cards/intake";
import { LeadPipelineCard } from "./cards/lead-pipeline";
import { LeadSourcesCard } from "./cards/lead-sources";
import { RoutingRulesCard } from "./cards/routing-rules";
import { TeamChatCard } from "./cards/team-chat";
import { TimesheetCard } from "./cards/timesheet";

export const metadata: Metadata = {
  title: "Epic",
  description: "Earth UI components composed into real moments from Full Creative products.",
};

// Product moments from full.io/tools, one per card. Showcase only, not in the registry.
export default function EpicPage() {
  return (
    <div className="container-wrapper flex flex-col gap-8 py-12">
      <header className="flex max-w-2xl flex-col gap-2">
        <h1 className="text-heading-32 text-eds-primary">Epic</h1>
        <p className="text-body-16 text-eds-secondary">
          Earth UI in the products it ships with: bookings, calls, chat, leads, learning and time
          tracking.
        </p>
      </header>
      <div className="columns-1 gap-4 md:columns-2 xl:columns-3 2xl:columns-4 *:mb-4 *:break-inside-avoid">
        <BookSlotCard />
        <CallLogCard />
        <TeamChatCard />
        <LeadPipelineCard />
        <AgendaCard />
        <RoutingRulesCard />
        <InboxCard />
        <CourseCard />
        <TimesheetCard />
        <BookDeskCard />
        <CallerVerifyCard />
        <IntakeCard />
        <DispatchCard />
        <LeadSourcesCard />
      </div>
      <Toaster />
    </div>
  );
}
