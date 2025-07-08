import { OrderStatus } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

async function updateOrderStatus(request: CreateCustomerRequest) {
    const response = await fetch(`/api/orders/${request.orderNumber}/update-status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: request.status }),
    });

    if (!response.ok) {
        throw new Error('Failed to update order status');
    }
}

export type CreateCustomerRequest = {
    orderNumber: string;
    status: OrderStatus;
}

export function useUpdateOrderStatus() {
    const mutation = useMutation({
        mutationFn: async (data: CreateCustomerRequest) => {
            return updateOrderStatus(data);
        },
    });

    return mutation;
}

