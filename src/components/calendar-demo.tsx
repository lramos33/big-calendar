"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarRange, Columns, Grid2x2, Grid3x3, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

import { EventCalendarAgendaView, EventCalendarContainer, EventCalendarDayView, EventCalendarHeader, EventCalendarMonthView, EventCalendarRoot, EventCalendarWeekView, EventCalendarYearView, IEvent } from "./event-calendar";

export function CalendarDemo({
  view,
  events
}: {
  view: "day" | "week" | "month" | "year" | "agenda";
  events: IEvent[];
}) {
  const router = useRouter();
  return (
    <EventCalendarRoot 
      view={view} 
      events={events}
      onViewUpdate={(view) => {
        router.push(`?view=${view}`);
      }}
    >
      <EventCalendarHeader>
        <EventCalendarNavigation view={view} />
      </EventCalendarHeader>
      <EventCalendarContainer>
        <EventCalendarDayView />
        <EventCalendarWeekView />
        <EventCalendarMonthView />
        <EventCalendarYearView />
        <EventCalendarAgendaView />
      </EventCalendarContainer>
    </EventCalendarRoot>
  )
}

function EventCalendarNavigation({
  view
}: {
  view: "day" | "week" | "month" | "year" | "agenda";
}) {
  return (
    <ButtonGroup>
      <Button
        asChild
        aria-label="View by day"
        size="icon-sm"
        variant={view === "day" ? "default" : "outline"}
      >
        <Link href="?view=day">
          <List className="size-4" />
        </Link>
      </Button>

      <Button
        asChild
        aria-label="View by week"
        size="icon-sm"
        variant={view === "week" ? "default" : "outline"}
      >
        <Link href="?view=week">
          <Columns className="size-4" />
        </Link>
      </Button>

      <Button
        asChild
        aria-label="View by month"
        size="icon-sm"
        variant={view === "month" ? "default" : "outline"}
      >
        <Link href="?view=month">
          <Grid2x2 className="size-4" />
        </Link>
      </Button>

      <Button
        asChild
        aria-label="View by year"
        size="icon-sm"
        variant={view === "year" ? "default" : "outline"}
      >
        <Link href="?view=year">
          <Grid3x3 className="size-4" />
        </Link>
      </Button>

      <Button
        asChild
        aria-label="View by agenda"
        size="icon-sm"
        variant={view === "agenda" ? "default" : "outline"}
      >
        <Link href="?view=agenda">
          <CalendarRange className="size-4" />
        </Link>
      </Button>
    </ButtonGroup>
  )
}