"use client";

import { useState } from "react";
import { useSearchParamsSetter } from "@/hooks/use-search-params-setter";
import {
  EventCalendarAgendaView,
  EventCalendarContainer,
  EventCalendarDayView,
  EventCalendarHeader,
  EventCalendarMonthView,
  EventCalendarRoot,
  EventCalendarWeekView,
  EventCalendarYearView,
  IEvent
} from "./event-calendar";
import { UserSelect } from "./demo/user-select";
import { CalendarViewSwitcher } from "./demo/calendar-view-switcher";
import { AddEventDialog } from "./demo/add-event-dialog";
import { EventDetailsDialog } from "./demo/event-details-dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

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

  const [addDialogState, setAddDialogState] = useState<{
    isOpen: boolean;
    startDate?: Date;
    startTime?: { hour: number; minute: number };
  }>({ isOpen: false });

  const [detailsDialogState, setDetailsDialogState] = useState<{
    isOpen: boolean;
    event?: IEvent;
  }>({ isOpen: false });

  return (
    <>
      <EventCalendarRoot
        view={view}
        events={events}
        onViewUpdate={(view) => {
          setSearchParams({ view });
        }}
        onAdd={({ startDate, hour, minute }) => {
          setAddDialogState({
            isOpen: true,
            startDate,
            startTime: { hour, minute },
          });
        }}
        onDetail={(event) => {
          setDetailsDialogState({
            isOpen: true,
            event: event,
          });
        }}
      >
        <EventCalendarHeader>
          <CalendarViewSwitcher view={view} />
          <UserSelect users={users} />
          <Button className="w-full sm:w-auto" onClick={() => setAddDialogState({ isOpen: true })}>
            <Plus />
            Add Event
          </Button>
        </EventCalendarHeader>
        <EventCalendarContainer>
          <EventCalendarDayView />
          <EventCalendarWeekView />
          <EventCalendarMonthView />
          <EventCalendarYearView />
          <EventCalendarAgendaView />
        </EventCalendarContainer>
      </EventCalendarRoot>

      <AddEventDialog
        startDate={addDialogState.startDate}
        startTime={addDialogState.startTime}
        users={users}
        isOpen={addDialogState.isOpen}
        onClose={() => setAddDialogState({ isOpen: false })}
        onToggle={() => setAddDialogState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
      />

      {detailsDialogState.event && (
        <EventDetailsDialog
          event={detailsDialogState.event}
          users={users}
          open={detailsDialogState.isOpen}
          onOpenChange={(open) => setDetailsDialogState(prev => ({ ...prev, isOpen: open }))}
        />
      )}
    </>
  );
}
