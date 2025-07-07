import type { TEventColor } from "@/calendar/types";
import type { TIntegrationType } from "@/calendar/integrations/types";

export interface IUser {
  id: string;
  name: string;
  picturePath: string | null;
}

export interface IEvent {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  color: TEventColor;
  description: string;
  user: IUser;
  integration: {
    type: TIntegrationType;
    name: string;
    icon: string;
    color: string;
    externalId?: string;
    url?: string;
  };
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
