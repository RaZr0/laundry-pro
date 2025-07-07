import { cn } from "@/lib/utils";
import { Order, OrderStatus as Status } from "@/types/order";

const STATUSES_MAP: Record<Status, { className: string, label: string }> = {
    "pending": { className: "bg-yellow-100 text-yellow-800", label: "ממתין" },
    "in_progress": { className: "bg-blue-100 text-blue-800", label: "בטיפול" },
    "completed": { className: "bg-green-100 text-green-800", label: "הושלם" },
    "cancelled": { className: "bg-red-100 text-red-800", label: "בוטל" },
}

type OrderStatusProps = {
    order: Order;
}

export function OrderStatus({ order }: OrderStatusProps) {
    const status = STATUSES_MAP[order.status];
    return (<span className={cn('text-xs font-semibold py-0.5 px-3 border rounded-full', status?.className)}>{status?.label}</span>);
}