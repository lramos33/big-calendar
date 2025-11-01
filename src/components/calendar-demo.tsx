"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarRange, Columns, Grid2x2, Grid3x3, List } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { EventCalendarAgendaView, EventCalendarContainer, EventCalendarDayView, EventCalendarHeader, EventCalendarMonthView, EventCalendarRoot, EventCalendarWeekView, EventCalendarYearView, IEvent } from "./event-calendar";

export function CalendarDemo({
  view,
  events,
  users
}: {
  view: "day" | "week" | "month" | "year" | "agenda";
  events: IEvent[];
  users: { id: string; name: string, picturePath: string | null }[];
}) {
  const setSearchParams = useSearchParamsSetter();
  return (
    <EventCalendarRoot
      view={view}
      events={events}
      onViewUpdate={(view) => {
        setSearchParams({ view });
      }}
    >
      <EventCalendarHeader>
        <EventCalendarNavigation view={view} />
        <UserSelect users={users} />
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
  const setSearchParams = useSearchParamsSetter();
  return (
    <ButtonGroup>
      <Button
        aria-label="View by day"
        size="icon"
        variant={view === "day" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "day" });
        }}
      >
        <List className="size-4" />
      </Button>

      <Button
        aria-label="View by week"
        size="icon"
        variant={view === "week" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "week" });
        }}
      >
        <Columns className="size-4" />
      </Button>

      <Button
        aria-label="View by month"
        size="icon"
        variant={view === "month" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "month" });
        }}
      >
        <Grid2x2 className="size-4" />
      </Button>

      <Button
        aria-label="View by year"
        size="icon"
        variant={view === "year" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "year" });
        }}
      >
        <Grid3x3 className="size-4" />
      </Button>

      <Button
        aria-label="View by agenda"
        size="icon"
        variant={view === "agenda" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "agenda" });
        }}
      >
        <CalendarRange className="size-4" />
      </Button>
    </ButtonGroup>
  )
}


export function UserSelect({
  users
}: {
  users: { id: string; name: string, picturePath: string | null }[];
}) {
  const search = useSearchParams();
  const setSearchParams = useSearchParamsSetter();
  const selectedUserId = search.get("user") ?? "all";

  return (
    <Select
      value={selectedUserId}
      onValueChange={(value) => {
        setSearchParams({ user: value });
      }}
    >
      <SelectTrigger className="md:w-48">
        <SelectValue />
      </SelectTrigger>

      <SelectContent align="end">
        <SelectItem value="all">
          <div className="flex items-center gap-1">
            <AvatarGroup max={2}>
              {users.map(user => (
                <Avatar key={user.id} className="size-6 text-xxs">
                  <AvatarImage src={user.picturePath ?? undefined} alt={user.name} />
                  <AvatarFallback className="text-xxs">{user.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            All
          </div>
        </SelectItem>

        {users.map(user => (
          <SelectItem key={user.id} value={user.id} className="flex-1">
            <div className="flex items-center gap-2">
              <Avatar key={user.id} className="size-6">
                <AvatarImage src={user.picturePath ?? undefined} alt={user.name} />
                <AvatarFallback className="text-xxs">{user.name[0]}</AvatarFallback>
              </Avatar>

              <p className="truncate">{user.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// a hook to set search params
function useSearchParamsSetter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setSearchParams(params: Record<string, string | null>) {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });

    router.push(`?${currentParams.toString()}`);
  }

  return setSearchParams;
}