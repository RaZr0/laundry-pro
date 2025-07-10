import { queryClient } from "@/app/query-client";
import { UpdateOrderStatusDto } from "@/dtos/orders/update-order-status.dto";
import { useMutation } from "@tanstack/react-query";
import { ORDERS_API_URL, UPDATE_ORDER_STATUS_API_URL } from "../api-urls";

async function updateOrderStatus(request: UpdateOrderStatusDto): Promise<void> {
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
        mutationFn: async (data: UpdateOrderStatusDto & { orderNumber: string}) => {
            return updateOrderStatus(data);
        },
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({ queryKey: [`${ORDERS_API_URL}/${data.orderNumber}`] });
        }
    });

    return mutation;
}

