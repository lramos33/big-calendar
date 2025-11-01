
import { getEvents } from "@/calendar/requests";
import { CalendarDemo } from "@/components/calendar-demo";

export default async function CalendarPage({
  searchParams
}: {
  searchParams: Promise<{ view: "day" | "week" | "month" | "year" | "agenda" }>;
}) {
  const events = await getEvents();
  const { view = "day" } = await searchParams;

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
      <CalendarDemo events={events} view={view} />
    </div>
  )
}