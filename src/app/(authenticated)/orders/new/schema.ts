import z from "zod";

export const orderItemSchema = z.object({
    productId: z.string().nonempty(),
    productName: z.string().nonempty(),
    quantity: z.number().min(1),
    notes: z.string().optional(),
    price: z.number(),
    serviceCategory: z.string().nonempty(),
});

export const formSchema  = z.object({
    orderItems: z.array(orderItemSchema).min(1, "צריך לפחות פריט אחד"),
    notes: z.string().optional(),
    customerId: z.string().nonempty(),
});

export type FormValues = z.infer<typeof formSchema>;