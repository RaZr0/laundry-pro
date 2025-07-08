import { ListItemRow } from "@/components/list-item-row";
import { OrderStatus } from "@/components/order-status";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { calculateOrderTotal } from "@/utils/order";
import { formatPrice } from "@/utils/price";

type OrdersListProps = {
    data: Order[];
    onOrderClick?: (order: Order) => void;
}

function OrderItem({ order }: { order: Order }) {
    return (
        <Card>
            <h2 className="font-medium text-lg">{order.orderNumber}</h2>
            <div className="flex flex-col gap-2">
                <ListItemRow label="סאטאוס" value={<OrderStatus order={order} />} />
                <ListItemRow label="לקוח" value={`${order.customer.firstName} ${order.customer.lastName}`} />
                <ListItemRow label="סה״כ" value={formatPrice(calculateOrderTotal(order))} />
            </div>
        </Card>
    )
}

export function OrdersList({ data, onOrderClick }: OrdersListProps) {
    return (
        <ul className="flex flex-col gap-4">
            {data.map(order => (
                <li key={order.id} onClick={() => onOrderClick?.(order)} className="cursor-pointer">
                    <OrderItem order={order} />
                </li>
            ))}
        </ul>
    );
}