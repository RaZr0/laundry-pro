import { Card } from "@/components/ui/card";
import { formatDateAndTime } from "@/utils/dates";
import { calculateOrderTotal } from "@/utils/order";
import { OrderItems } from "./order-items";
import { formatPrice } from "@/utils/price";
import { OrderStatus } from "../../../../../../components/order-status";
import { ListItemRow } from "@/components/list-item-row";
import { OrderDto } from "@/dtos/orders/order.dto";

function OrderItem({ data }: { data: OrderDto }) {
    return (
        <Card>
            <h2 className="font-medium text-lg">{data.orderNumber}</h2>
            <div className="flex flex-col gap-2">
                <ListItemRow label="תאריך" value={formatDateAndTime(data.createdAt)} />
                <ListItemRow label="פריטים" value={<OrderItems data={data.orderItems} />} />
                <ListItemRow label="סה״כ" value={formatPrice(calculateOrderTotal(data))} />
                <ListItemRow label="סטטוס" value={<OrderStatus order={data} />} />
            </div>
        </Card>
    );
}

type OrdersHistoryListProps = {
    data: OrderDto[];
}

export function OrdersHistoryList({ data }: OrdersHistoryListProps) {
    return (
        <ul className="flex flex-col gap-6">
            {data.map((order) => (
                <li key={order.id}>
                    <OrderItem data={order} />
                </li>

            ))}
        </ul>
    );
}