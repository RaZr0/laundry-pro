import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { createCustomer } from "../../../services/customers.service";
import { Addresses } from "./addresses";
import { GeneralDetails } from "./general-details";
import { MarketingAndNotifications } from "./marketing-and-notifications";
import { Prefrences } from "./prefrences";
import { FormSchema } from "./schema/schema";
import { useMutation } from "@tanstack/react-query";

type NewCustomerFormProps = {
    onSubmit: (data: z.infer<typeof FormSchema>) => void;
    onClose: () => void;
}

export function NewCustomerForm({ onSubmit, onClose }: NewCustomerFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: undefined,
            street: undefined,
            city: undefined,
            postalCode: undefined,
            apartmentFloor: undefined,
            apartmentNumber: undefined,
            apartmentEntrance: undefined,
            apartmentEntryCode: undefined,
            prefrencesNotes: undefined,
            joinMarketing: false,
            sendReminders: false,
            orderAcceptedAlert: false,
            orderInProgressAlert: false,
            orderReadyAlert: false,
            orderDeliveredAlert: false,
        },
    })

    const mutation = useMutation({
        mutationFn: async (data) => {
            return createCustomer(data);
        },
    });

    async function onSubmitForm(data: z.infer<typeof FormSchema>) {
        try {
            await mutation.mutateAsync(data);
            onSubmit(data);
            onClose?.();
        }
        catch (error) {
            console.error("Error creating customer:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
                <GeneralDetails form={form} />
                <Addresses form={form} />
                <Prefrences form={form} />
                <MarketingAndNotifications form={form} />
                <div className="flex gap-2 self-end">
                    <Button type="button" variant="outline" onClick={() => onClose()}>ביטול</Button>
                    <Button type="submit" isLoading={mutation.isPending}>שמור לקוח</Button>
                </div>
            </form>
        </Form>
    )
}
