import { CreateOrderDto } from "@/dtos/orders/create-order";
import { useMutation } from "@tanstack/react-query";

async function createOrder(request: CreateOrderDto): Promise<void> {
    const response = await fetch(`/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }
}

export function useCreateOrder() {
    const mutation = useMutation({
        mutationFn: async (data: CreateOrderDto) => {
            return createOrder(data);
        },
    });

    return mutation;
}

