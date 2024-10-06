import { z } from "zod";
export const userSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
});

export const eventSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
  duration: z.number().int().positive("Duration must be a positive number"),
  isPrivate: z.boolean(),
});

export const daySchema = z
  .object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isAvailable) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "Start time must be less than end time",
    }
  );

export const availabilitySchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  timeGap: z.number().min(0, "The time gap could not be less than 0").int().positive(),
});
