import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/utils/price";
import { Minus, Plus, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ServiceCategoryLabel } from "../service-category-label";
import z from "zod";
import { orderItemSchema } from "../../schema";

function Notes({ notes, onChange }: { notes?: string, onChange?: (notes: string) => void }) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="notes">הערות</Label>
            <TextArea id="notes" placeholder="ניתן לכתוב כאן הערות מיוחדות..." onChange={(e) => onChange?.(e.target.value)} value={notes} />
        </div>
    )
}

function Remove({ onRemove }: { onRemove?: () => void }) {
    return (
        <Button type="button" variant="ghost" onClick={() => onRemove?.()}>
            <X className="text-destructive" />
        </Button>
    )
}

function QuantityCounter({ quantity, onChange }: { quantity: number, onChange?: (quantity: number) => void }) {

    function onIncrease() {
        onChange?.(quantity + 1);
    }

    function onDecrease() {
        if (quantity > 1) {
            onChange?.(quantity - 1);
        }
    }

    return (
        <div className="flex items-center gap-4">
            <Button type="button" variant="outline" onClick={onDecrease}>
                <Minus />
            </Button>
            {quantity}
            <Button type="button" variant="outline" onClick={onIncrease}>
                <Plus />
            </Button>
        </div>
    )
}

function ProductDetails({ data }: { data: { price: number, quantity: number, serviceCategory: string, productName: string } }) {
    const { price, quantity, serviceCategory, productName } = data;
    return (<div>
        <div className="flex gap-2">
            <ServiceCategoryLabel serviceCategory={serviceCategory} />
            <span>{productName}</span>
        </div>
        <span className="text-sm text-muted-foreground">{`${formatPrice(quantity * price)} = ${quantity} x ${formatPrice(price)}`}</span>
    </div>)
}

type OrderItemProps = {
    index: number;
    item: z.infer<typeof orderItemSchema>;
    onRemove?: () => void;
}

export function OrderItem({ index, item, onRemove }: OrderItemProps) {
    const { setValue } = useFormContext();
    const { quantity, price, serviceCategory, productName, notes } = item;
    
    function onQuantityChange(value: number) {
        setValue(`orderItems.${index}.quantity`, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    function onNotesChange(value: string) {
        setValue(`orderItems.${index}.notes`, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    return (<Card className="p-4">
        <div className="flex justify-between">
            <ProductDetails data={{ price, quantity, serviceCategory, productName}} />
            <div className="flex items-center gap-6">
                <QuantityCounter quantity={quantity} onChange={onQuantityChange} />
                <Remove onRemove={() => onRemove?.()} />
            </div>
        </div>
        <Notes notes={notes} onChange={onNotesChange} />
    </Card>)
}