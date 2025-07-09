import { OrderDto, OrderStatusDto } from "@/dtos/orders/order.dto";
import { cn } from "@/lib/utils";

const STATUSES_MAP: Record<OrderStatusDto, { className: string, label: string }> = {
    "in_progress": { className: "bg-blue-100 text-blue-800", label: "בטיפול" },
    "ready": { className: "bg-green-100 text-green-800", label: "מוכן" },
    "completed": { className: "bg-gray-100 text-gray-800", label: "הושלם" },
    "in_delivery": { className: "bg-yellow-100 text-yellow-800", label: "יצא למשלוח" },
    "cancelled": { className: "bg-red-100 text-red-800", label: "בוטל" },
}

type OrderStatusProps = {
    order: OrderDto;
}

export function OrderStatus({ order }: OrderStatusProps) {
    const status = STATUSES_MAP[order.status];
    return (<span className={cn('text-xs font-semibold py-0.5 px-3 border rounded-full', status?.className)}>{status?.label}</span>);
}