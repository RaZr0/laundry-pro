import { OrderDto } from "@/dtos/orders/order.dto";
import { useQuery } from "@tanstack/react-query";
import { ORDERS_API_URL } from "../api-urls";

async function fetchOrder(request: OrderRequest): Promise<OrderDto> {
    const response = await fetch(`${ORDERS_API_URL}/${request.id}`);
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
        queryKey: [`${ORDERS_API_URL}/${id}`],
        queryFn: () => fetchOrder({ id }),
        enabled: true,
    });

    return query;
}

