import { queryClient } from "@/app/query-client";
import { updateOrderStatusDto } from "@/dtos/orders/update-order-status.dto";
import { useMutation } from "@tanstack/react-query";
import { UPDATE_ORDER_STATUS_API_URL } from "../api-urls";

async function updateOrderStatus(request: updateOrderStatusDto): Promise<void> {
    const response = await fetch(`${UPDATE_ORDER_STATUS_API_URL.replace('{orderNumber}', request.orderNumber)}`, {
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
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({ queryKey: [`${UPDATE_ORDER_STATUS_API_URL.replace('{orderNumber}', data.orderNumber)}`] });
        }
    });

    return mutation;
}

