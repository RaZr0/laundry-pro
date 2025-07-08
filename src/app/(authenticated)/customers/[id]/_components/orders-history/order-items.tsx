import { OrderItem } from "@/types/order-item";

type OrderItemsProps = {
    data : OrderItem[];
}

export function OrderItems({ data }: OrderItemsProps) {
    const items = data.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
    return (<span>
        {items}
    </span>
    );
}