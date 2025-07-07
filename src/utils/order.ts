import { Order } from "@/types/order";

export function calculateOrderTotal(order: Order) {
    return order.orderItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
}

export function calculateOrdersTotal(orders: Order[]) {
    return orders.reduce((total, order) => {
        const totalPrice = calculateOrderTotal(order);
        return total + totalPrice;
    }, 0);
}