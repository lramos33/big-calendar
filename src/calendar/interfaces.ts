import type { TEventColor } from "@/calendar/types";

export interface IUser {
  id: string;
  name: string;
  picturePath: string | null;
}

export interface IEventLocation {
  street: string;
  city: string;
  state: string;
  zip: string;
  lat: number | null;
  lng: number | null;
}

export interface IEvent {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  color: TEventColor;
  description: string;
  user: IUser;
  location?: IEventLocation | null;
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
