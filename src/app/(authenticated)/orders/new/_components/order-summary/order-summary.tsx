import { Card, CardTitle } from "@/components/ui/card";
import { orderItemSchema } from "../../schema";
import z from "zod";
import { formatPrice } from "@/utils/price";
import { ServiceCategoryLabel } from "../service-category-label";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

function TotalPrice({ items }: { items: z.infer<typeof orderItemSchema>[] }) {
    const basePrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalPrice = basePrice;
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <span>סכום ביניים</span>
                <span>{formatPrice(basePrice)}</span>
            </div>
            <Separator/>
            <div className="flex justify-between font-bold text-lg">
                <span>סה״כ</span>
                <span>{formatPrice(totalPrice)}</span>
            </div>
        </div>
    );
}

function Notes({ notes , onChange}: { notes?: string, onChange?: (notes: string) => void }) {
    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="notes">הערות להזמנה</Label>
            <TextArea id="notes" placeholder="הוסף הוראות מיוחדות להזמנה כולה" value={notes} onChange={(e) => onChange?.(e.target.value)} />
        </div>
    );
}

function ProductSummary({ data }: { data: { serviceCategory: string, quantity: number, productName: string, price: number } }) {
    const { serviceCategory, quantity, productName, price } = data;
    return (
        <div className="flex justify-between">
            <div className="flex gap-2">
                <ServiceCategoryLabel serviceCategory={serviceCategory} />
                <span>{`${quantity} x ${productName}`}</span>
            </div>
            <span>{formatPrice(price)}</span>
        </div>
    );
}

type OrderSummaryProps = {
    items: z.infer<typeof orderItemSchema>[];
}

export function OrderSummary({ items }: OrderSummaryProps) {
    const { formState, watch, setValue } = useFormContext();
    const notes = watch('notes');

    function onNotesChange(notes: string) {
        setValue('notes', notes, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    return (
        <Card>
            <CardTitle className="text-2xl">
                סיכום הזמנה
            </CardTitle>
            <div className="flex flex-col gap-4">
                <ul className="flex flex-col gap-2">
                    {items.map((item) => (
                        <li key={item.productId}>
                            <ProductSummary data={{ ...item }} />
                        </li>
                    ))}
                </ul>
                <Notes notes={notes} onChange={onNotesChange}/>
                <TotalPrice items={items} />
                <Button disabled={!formState.isValid}>
                    שלח הזמנה
                </Button>
            </div>
        </Card>
    );
}