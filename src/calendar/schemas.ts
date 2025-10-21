import { z } from "zod";

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
