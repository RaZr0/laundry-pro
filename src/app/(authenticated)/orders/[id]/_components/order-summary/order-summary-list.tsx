import { ListItemRow } from "@/components/list-item-row";
import { Card, CardTitle } from "@/components/ui/card";
import { OrderItem as OrderItemData } from "@/types/order-item";
import { formatPrice } from "@/utils/price";

function OrderItem({ orderItem }: { orderItem: OrderItemData }) {
    return (
        <Card>
            <CardTitle>
                {orderItem.product.name}
            </CardTitle>
            <div className="flex flex-col gap-1">
                <ListItemRow label="כמות" value={orderItem.quantity} />
                <ListItemRow label="סוג שירות" value={orderItem.product.serviceCategory.name} />
                <ListItemRow label="הערות מיוחדות" value={orderItem.notes ?? '-'} />
                <ListItemRow label="מחיר" value={formatPrice(orderItem.product.price)} />
            </div>
        </Card>
    );
}

type OrderSummaryListProps = {
    data: OrderItemData[];
}

export function OrderSummaryList({ data }: OrderSummaryListProps) {
    return (
        <ul className="flex flex-col gap-4">
            {data.map(orderItem => (
                <li key={orderItem.id}>
                    <OrderItem orderItem={orderItem} />
                </li>
            ))}
        </ul>
    );
}