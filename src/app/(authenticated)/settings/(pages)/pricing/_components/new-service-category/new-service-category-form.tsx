import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateServiceCategory } from "@/hooks/actions/service-categories/mutations/useCreateServiceCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormSchema } from "./schema";

type NewServiceCategoryFormProps = {
    onClose: () => void;
}

export function NewServiceCategoryForm({ onClose }: NewServiceCategoryFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })

    const mutation = useCreateServiceCategory();

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
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="flex flex-col gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-[1fr_3fr]">
                            <FormLabel>שם</FormLabel>
                            <FormControl>
                                <Input placeholder="שם הקטגוריה" {...field} autoComplete="new-password" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex gap-2 self-end">
                    <Button type="submit" isLoading={form.formState.isSubmitting}>הוסף קטגוריה</Button>
                </div>
            </form>
        </Form>
    )
}
