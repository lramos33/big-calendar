import { Settings } from "lucide-react";

import { CalendarProvider } from "@/calendar/contexts/calendar-context";

import { ChangeBadgeVariantInput } from "@/calendar/components/change-badge-variant-input";
import { ChangeVisibleHoursInput } from "@/calendar/components/change-visible-hours-input";

import { getEvents, getUsers } from "@/calendar/requests";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const [events, users] = await Promise.all([getEvents(), getUsers()]);

  return (
    <CalendarProvider users={users} events={events}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
        {children}

        <div className="flex items-center gap-2">
          <Settings className="size-4" />
          <p className="text-lg font-semibold">Settings</p>
        </div>

        <div className="flex flex-col gap-6">
          <ChangeBadgeVariantInput />
          <ChangeVisibleHoursInput />
        </div>
      </div>
    </CalendarProvider>
  );
}
