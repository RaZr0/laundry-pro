import { ListItemRow } from "@/components/list-item-row";
import { Card, CardTitle } from "@/components/ui/card";
import { OrderItemDto } from "@/dtos/order-item.dto";
import { formatPrice } from "@/utils/price";

function OrderItem({ orderItem }: { orderItem: OrderItemDto }) {
    return (
        <Card>
            <CardTitle>
                {orderItem.product.name}
            </CardTitle>
            <div className="flex flex-col gap-1">
                <ListItemRow label="כמות" value={orderItem.quantity} />
                <ListItemRow label="סוג שירות" value={orderItem.product.serviceCategory.name} />
                <ListItemRow label="הערות מיוחדות" value={orderItem.notes ?? '-'} />
                <ListItemRow label="מחיר" value={formatPrice(orderItem.price)} />
            </div>
        </Card>
    );
}

type OrderSummaryListProps = {
    data: OrderItemDto[];
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