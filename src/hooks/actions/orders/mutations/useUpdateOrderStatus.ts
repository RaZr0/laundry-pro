import { updateOrderStatusDto } from "@/dtos/orders/update-order-status.dto";
import { useMutation } from "@tanstack/react-query";

async function updateOrderStatus(request: updateOrderStatusDto): Promise<void> {
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

export function useUpdateOrderStatus() {
    const mutation = useMutation({
        mutationFn: async (data: updateOrderStatusDto) => {
            return updateOrderStatus(data);
        },
    });

    return mutation;
}

