import { Order } from '@/types/order';
import { formatDate } from '@/utils/dates';

export function LastOrder({ orders }: { orders: Order[] }) {
    const lastOrder = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    return (
        <span>{formatDate(lastOrder?.createdAt)}</span>
     );
}