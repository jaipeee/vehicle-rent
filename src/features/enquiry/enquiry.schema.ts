import { z } from "zod";

export const enquirySchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required"),

  lastName: z
    .string()
    .trim()
    .optional(),

  phone: z
    .string()
    .trim()
    .min(10, "Valid 10-digit mobile number required")
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;