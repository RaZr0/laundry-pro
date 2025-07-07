import { OrderItem } from "@/types/order-item";

type OrderItemsProps = {
    orderItems : OrderItem[];
}

export function OrderItems({ orderItems }: OrderItemsProps) {
    const items = orderItems.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
    return (<span>
        {items}
    </span>
    );
}