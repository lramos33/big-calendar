"use client";

import { format, parseISO } from "date-fns";
import { Calendar, Clock, MapPin, Text, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditEventDialog } from "@/calendar/components/dialogs/edit-event-dialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import type { IEvent } from "@/calendar/interfaces";

interface IProps {
  event: IEvent;
  children: React.ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <User className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Responsible</p>
                <p className="text-sm text-muted-foreground">{event.user.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{format(startDate, "MMM d, yyyy h:mm a")}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">{format(endDate, "MMM d, yyyy h:mm a")}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Text className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>

            {event.location && (
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 size-4 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    {event.location.street}, {event.location.city}, {event.location.state} {event.location.zip}
                  </p>
                  {event.location.lat != null && event.location.lng != null && (
                    <p className="text-xs text-muted-foreground">
                      Coordinates: {event.location.lat}, {event.location.lng}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <EditEventDialog event={event}>
              <Button type="button" variant="outline">
                Edit
              </Button>
            </EditEventDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
