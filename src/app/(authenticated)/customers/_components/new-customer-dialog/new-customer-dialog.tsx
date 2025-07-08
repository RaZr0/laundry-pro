import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchCustomers } from "../../services/customers.service";
import { NewCustomerForm } from "./new-customer-form/new-customer-form";

type NewCustomerModalProps = {
    open: boolean;
    onClose?: () => void;
}

export function NewCustomerDialog({ open, onClose }: NewCustomerModalProps) {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            return fetchCustomers();
        },
        onSuccess: () => {
            onClose?.();
            router.refresh();
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