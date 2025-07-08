import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewCustomerForm } from "./new-customer-form/new-customer-form";
import { queryClient } from "@/app/query-client";

type NewCustomerModalProps = {
    open: boolean;
    onClose?: () => void;
}

export function NewCustomerDialog({ open, onClose }: NewCustomerModalProps) {
    return (
        <Dialog open={open} onOpenChange={(open) => !open ? onClose?.() : undefined}>
            <DialogContent showCloseButton={false} className="!max-w-4xl">
                <DialogHeader>
                    <DialogTitle>רשום לקוח חדש</DialogTitle>
                </DialogHeader>
                <NewCustomerForm onCreated={() => queryClient.invalidateQueries({ queryKey: ['api/customers'] })} onClose={() => onClose?.()} />
            </DialogContent>
        </Dialog>
    );
}