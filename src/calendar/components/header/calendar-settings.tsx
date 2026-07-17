"use client";

import { Settings } from "lucide-react";

import { ChangeBadgeVariantInput } from "@/calendar/components/change-badge-variant-input";
import { ChangeVisibleHoursInput } from "@/calendar/components/change-visible-hours-input";
import { ChangeWorkingHoursInput } from "@/calendar/components/change-working-hours-input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function CalendarSettings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Calendar settings">
          <Settings className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="top-0 left-0 translate-x-0 translate-y-0 w-[100vw] h-[100dvh] max-w-none rounded-none p-4 overflow-y-auto overflow-x-hidden flex flex-col justify-start sm:grid sm:top-[50%] sm:left-[50%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:h-auto sm:w-full sm:max-w-lg sm:max-h-[90vh] sm:rounded-lg sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="size-5" />
            Calendar settings
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-6 p-1">
          <ChangeBadgeVariantInput />
          <hr className="border-border" />
          <ChangeVisibleHoursInput />
          <hr className="border-border" />
          <ChangeWorkingHoursInput />
        </div>
      </DialogContent>
    </Dialog>
  );
}
