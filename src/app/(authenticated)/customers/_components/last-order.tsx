import { OrderDto } from '@/dtos/orders/order.dto';
import { formatDate } from '@/utils/dates';

export function LastOrder({ orders }: { orders: OrderDto[] }) {
    const lastOrder = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    return (
        <span>{formatDate(lastOrder?.createdAt)}</span>
     );
}