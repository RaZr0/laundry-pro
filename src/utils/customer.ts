import { Order } from "@/types/order";
import { calculateOrderTotal } from "./order";

export function calculateBalance(orders: Order[]) {
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