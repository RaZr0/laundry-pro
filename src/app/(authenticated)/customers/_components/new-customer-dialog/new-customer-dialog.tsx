import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewCustomerForm } from "./new-customer-form/new-customer-form";

type NewCustomerDialogProps = {
    open: boolean;
    onClose?: () => void;
}

export function NewCustomerDialog({ open, onClose }: NewCustomerDialogProps) {
    return (
        <Dialog open={open} onOpenChange={(open) => !open ? onClose?.() : undefined}>
            <DialogContent showCloseButton={false} className="!max-w-4xl">
                <DialogHeader>
                    <DialogTitle>רשום לקוח חדש</DialogTitle>
                </DialogHeader>
                <NewCustomerForm onClose={() => onClose?.()} />
            </DialogContent>
        </Dialog>
    );
}