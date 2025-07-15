import z from "zod";

export const FormSchema  = z.object({
    name: z.string().min(1, "שדה חובה"),
});

export type FormValues = z.infer<typeof FormSchema>;