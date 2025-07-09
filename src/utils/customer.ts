import { OrderDto } from "@/dtos/orders/order.dto";
import { calculateOrderTotal } from "./order";

export function calculateBalance(orders: OrderDto[]) {
    return orders.reduce((balance, order) => {
        const totalPrice = calculateOrderTotal(order);
        if (order.status === 'completed' && !order.paid) {
            return balance - totalPrice;
        }
        else if (order.status !== 'completed' && order.paid) {
            return balance + totalPrice;
        }
        return balance;
    }, 0);
}