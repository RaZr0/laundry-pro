import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { formatDateAndTime } from "@/utils/dates";
import { calculateOrderTotal } from "@/utils/order";
import { OrderItems } from "./order-items";
import { formatPrice } from "@/utils/price";
import { OrderStatus } from "./order-status";

function Row({ label, value }: { label: string, value: React.ReactNode }) {
    return (
        <div className="flex gap-2 text-sm">
            <span className="text-muted-foreground">{label}:</span>
            <span>{value}</span>
        </div>
    );
}

function OrderItem({ order }: { order: Order }) {
    return (
        <li key={order.id}>
            <Card>
                <h2 className="font-medium text-lg">{order.orderNumber}</h2>
                <div className="flex flex-col gap-2">
                    <Row label="תאריך" value={formatDateAndTime(order.createdAt)} />
                    <Row label="פריטים" value={<OrderItems orderItems={order.orderItems} />} />
                    <Row label="סה״כ" value={formatPrice(calculateOrderTotal(order))} />
                    <Row label="סטטוס" value={<OrderStatus order={order} />} />
                </div>
            </Card>
        </li>
    );
}

type OrdersHistoryListProps = {
    data: Order[];
}

export function OrdersHistoryList({ data }: OrdersHistoryListProps) {
    return (
        <ul className="flex flex-col gap-6">
            {data.map((order) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </ul>
    );
}