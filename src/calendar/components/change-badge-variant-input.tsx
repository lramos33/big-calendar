"use client";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { Select } from "@/components/old-ui/select";

export function ChangeBadgeVariantInput() {
  const { badgeVariant, setBadgeVariant } = useCalendar();

  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold">Change badge variant</p>

      <Select.Root value={badgeVariant} onValueChange={setBadgeVariant}>
        <Select.Trigger className="w-48">
          <Select.Value />
        </Select.Trigger>

        <Select.Content viewportClassName="w-64" align="end">
          <Select.Item value="dot">Dot</Select.Item>
          <Select.Item value="colored">Colored</Select.Item>
          <Select.Item value="mixed">Mixed</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
