import z from "zod";

export const FormSchema = z.object({
    name: z.string().nonempty("שדה חובה"),
    serviceCategoryId: z.string().nonempty("שדה חובה"),
    priceUnitId: z.string().nonempty("שדה חובה"),
    price: z.number().min(0, "מחיר חייב להיות גדול מ-0"),
    imageUrl: z.string().optional(),
})
