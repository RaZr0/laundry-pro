import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewCustomerForm } from "./new-customer-form/new-customer-form";
import { useMutation } from "@tanstack/react-query";
import { fetchCustomers } from "../../services/customers.service";
import { customersStore } from "../../customers-store";

type NewCustomerModalProps = {
    open: boolean;
    onClose?: () => void;
}

export function NewCustomerDialog({ open, onClose }: NewCustomerModalProps) {
    const mutation = useMutation({
        mutationFn: async () => {
            return fetchCustomers();
        },
        onSuccess: (data) => {
            customersStore.setCustomers(data);
        },
    });

    return (
        <Dialog open={open} onOpenChange={(open) => !open ? onClose?.() : undefined}>
            <DialogContent showCloseButton={false} className="!max-w-4xl">
                <DialogHeader>
                    <DialogTitle>רשום לקוח חדש</DialogTitle>
                </DialogHeader>
                <NewCustomerForm onSubmit={() => mutation.mutate()} onClose={() => onClose?.()} />
            </DialogContent>
        </Dialog>
    );
}