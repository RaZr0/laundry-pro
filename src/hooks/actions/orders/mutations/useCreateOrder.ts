import { queryClient } from "@/app/query-client";
import { CreateOrderDto } from "@/dtos/orders/create-order";
import { useMutation } from "@tanstack/react-query";
import { ORDERS_API_URL } from "../api-urls";

async function createOrder(request: CreateOrderDto): Promise<{orderNumber: string}> {
    const response = await fetch(ORDERS_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });


    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    const json = await response.json();
    return json;

}

export function useCreateOrder() {
    const mutation = useMutation({
        mutationFn: async (data: CreateOrderDto) => {
            return createOrder(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ORDERS_API_URL] });
        }
    });

    return mutation;
}

