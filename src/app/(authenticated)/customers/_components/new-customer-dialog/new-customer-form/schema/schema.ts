import z from "zod";

export const FormSchema = z.object({
    firstName: z.string().nonempty("שדה חובה"),
    lastName: z.string().nonempty("שדה חובה"),
    phone: z
        .string()
        .trim()
        .regex(/^\+972\s5[0-9]\s\d{3}-\d{4}$/, {
            message: "מספר טלפון לא תקין",
        }),
    email: z.string().transform((val) => (val === "" ? undefined : val)).optional().pipe(z.string().email({ message: "דואר אלקטרוני לא תקין" }).optional()),
    street: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    apartmentFloor: z.number().optional(),
    apartmentNumber: z.number().optional(),
    apartmentEntrance: z.string().optional(),
    apartmentEntryCode: z.string().optional(),
    prefrencesNotes: z.string().optional(),
    joinMarketing: z.boolean(),
    sendReminders: z.boolean(),
    orderAcceptedAlert: z.boolean(),
    orderInProgressAlert: z.boolean(),
    orderReadyAlert: z.boolean(),
    orderDeliveredAlert: z.boolean(),
})
