import { Card, CardTitle } from "@/components/ui/card";
import { OrderItem } from "./order-item";
import z from "zod";
import { orderItemSchema } from "../../schema";

type OrderItemsProps = {
    items: z.infer<typeof orderItemSchema>[];
    onRemove?: (index: number) => void;
}

export function OrderItems({ items, onRemove }: OrderItemsProps) {
    return (
        <Card>
            <CardTitle className="text-2xl">
                פריטים בהזמנה
            </CardTitle>
            {items.length ? <ul className="flex flex-col gap-6">
                {items.map((item, index) => (
                    <li key={item.productId}>
                        <OrderItem item={item} index={index} onRemove={() => onRemove?.(index)}/>
                    </li>
                ))}
            </ul> : 'אין פריטים בהזמנה'}
        </Card>
    );
}