import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { BaseDetails } from "./base-details/base-details";
import { FormSchema } from "./schema/schema";
import { useCreateProduct } from "@/hooks/actions/products/mutations/useCreateProduct";
import { ImageSelection } from "./image-selection/image-selection";

type NewProductFormProps = {
    onClose: () => void;
}

export function NewProductForm({ onClose }: NewProductFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            serviceCategoryId: "",
            priceUnitId: "",
            price: 0,
            imageUrl: "",
        },
    })

    const mutation = useCreateProduct();

    async function onSubmitForm(data: z.infer<typeof FormSchema>) {
        try {
            await mutation.mutateAsync(data);
            onClose?.();
        }
        catch (error) {
            console.error("Error creating customer:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
                <BaseDetails form={form} />
                <ImageSelection form={form} />
                <div className="flex gap-2 self-end">
                    <Button type="button" variant="outline" onClick={() => onClose()}>ביטול</Button>
                    <Button type="submit" isLoading={form.formState.isSubmitting}>שמור</Button>
                </div>
            </form>
        </Form>
    )
}
