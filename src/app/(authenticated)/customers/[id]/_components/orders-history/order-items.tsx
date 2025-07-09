import { OrderItemDto } from "@/dtos/order-item.dto";

type OrderItemsProps = {
    data : OrderItemDto[];
}

export function OrderItems({ data }: OrderItemsProps) {
    const items = data.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
    return (<span>
        {items}
    </span>
    );
}