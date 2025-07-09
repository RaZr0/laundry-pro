import { OrderDto } from "@/dtos/orders/order.dto";

export function calculateOrderTotal(order: OrderDto) {
    return order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function calculateOrdersTotal(orders: OrderDto[]) {
    return orders.reduce((total, order) => {
        const totalPrice = calculateOrderTotal(order);
        return total + totalPrice;
    }, 0);
}