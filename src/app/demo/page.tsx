
import { getEvents, getUsers } from "@/calendar/requests";
import { CalendarDemo } from "@/components/calendar-demo";

export default async function CalendarPage({
  searchParams
}: {
  searchParams: Promise<{ 
    view: "day" | "week" | "month" | "year" | "agenda";
    user: string; 
  }>;
}) {
  const [events, users] = await Promise.all([getEvents(), getUsers()]);
  const { view = "day", user = "all" } = await searchParams;

  const filteredEvents = user === "all" ? events : events.filter(event => event.user.id === user);

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
      <CalendarDemo events={filteredEvents} users={users} view={view} />
    </div>
  )
}