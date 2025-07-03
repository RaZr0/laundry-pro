import { Order } from "../types/order";
import { format } from 'date-fns';

export function LastOrder({ orders }: { orders: Order[] }) {
    const lastOrder = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    return (
        <span>{lastOrder ? format(lastOrder.createdAt, "dd/MM/yyyy") : ''}</span>
     );
}