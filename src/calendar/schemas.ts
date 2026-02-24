import { z } from "zod";

export const locationSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z
    .string()
    .length(2, "State must be a 2-letter abbreviation")
    .transform(val => val.toUpperCase()),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "ZIP code must be a valid US format (e.g. 12345 or 12345-6789)"),
  lat: z.number().min(-90).max(90).nullable().optional(),
  lng: z.number().min(-180).max(180).nullable().optional(),
});

export const eventSchema = z
  .object({
    user: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    startDate: z.date({ required_error: "Start date is required" }),
    startTime: z.object({ hour: z.number(), minute: z.number() }, { required_error: "Start time is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    endTime: z.object({ hour: z.number(), minute: z.number() }, { required_error: "End time is required" }),
    color: z.enum(["blue", "green", "red", "yellow", "purple", "orange", "gray"], { required_error: "Color is required" }),
    location: locationSchema.optional(),
  })
  .transform(data => {
    if (data.location) {
      const { street, city, state, zip } = data.location;
      const hasAnyValue = [street, city, state, zip].some(v => v.length > 0);
      if (!hasAnyValue) {
        return { ...data, location: undefined };
      }
    }
    return data;
  })
  .refine(
    data => {
      const startDateTime = new Date(data.startDate);
      startDateTime.setHours(data.startTime.hour, data.startTime.minute, 0, 0);

      const endDateTime = new Date(data.endDate);
      endDateTime.setHours(data.endTime.hour, data.endTime.minute, 0, 0);

      return startDateTime < endDateTime;
    },
    {
      message: "Start date cannot be after end date",
      path: ["startDate"],
    }
  );

export type TEventFormData = z.infer<typeof eventSchema>;
