import { formatPrice } from "@/utils/price";
import { CreditCard } from "lucide-react";
import { Order } from "../types/order";

export function TotalOrdersPrice({ orders }: { orders: Order[] }) {
    const ordersTotal = orders.reduce((total, order) => total + (order.paid ? order.total : -order.total), 0);
    return (
        <div className='flex gap-2 items-center'>
            <span className={ordersTotal < 0 ? 'text-red-600' : 'text-green-600'}>{formatPrice(ordersTotal)}</span>
            <span><CreditCard size={16} /></span>
        </div>
    );
}