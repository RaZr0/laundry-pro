import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewServiceCategoryForm } from "./new-service-category-form";

type NewServiceCategoryDialogProps = {
    onClose?: () => void;
}

export function NewServiceCategoryDialog({ onClose }: NewServiceCategoryDialogProps) {
    return (
        <DialogContent showCloseButton={false} className="!max-w-1xl flex flex-col gap-8">
            <DialogHeader>
                <DialogTitle>הוספת קטגוריה חדשה</DialogTitle>
                <DialogDescription>
                    צור קטגוריה חדשה עבור השירותים שלך
                </DialogDescription>
            </DialogHeader>
            <NewServiceCategoryForm onClose={() => onClose?.()} />
        </DialogContent>
    );
}