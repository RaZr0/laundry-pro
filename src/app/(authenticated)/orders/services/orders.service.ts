import { OrderStatus } from "@/types/order";

export async function updateOrderStatus(orderNumber: string, status: OrderStatus) {
    const response = await fetch(`/api/orders/${orderNumber}/update-status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        throw new Error('Failed to update order status');
    }
}