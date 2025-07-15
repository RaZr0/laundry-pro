import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewProductForm } from "./new-product-form/new-product-form";

type NewProductDialogProps = {
    onClose?: () => void;
}

export function NewProductDialog({ onClose }: NewProductDialogProps) {
    return (
        <DialogContent showCloseButton={false} className="!max-w-4xl flex flex-col gap-8">
            <DialogHeader>
                <DialogTitle>פרטי מוצר</DialogTitle>
            </DialogHeader>
            <NewProductForm onClose={() => onClose?.()} />
        </DialogContent>
    );
}