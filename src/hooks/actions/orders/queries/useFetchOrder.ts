import { OrderDto } from "@/dtos/orders/order.dto";
import { useQuery } from "@tanstack/react-query";

async function fetchOrder(request: OrderRequest): Promise<OrderDto> {
    const response = await fetch(`/api/orders/${request.id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }
    return response.json();
}

export type OrderRequest = {
    id: string;
}

export function useFetchOrder({ id }: OrderRequest) {
    const query = useQuery({
        queryKey: [`api/orders/${id}`],
        queryFn: () => fetchOrder({ id }),
        enabled: true,
    });

    return query;
}

