import { OrderDto } from "@/dtos/orders/order.dto";
import { useQuery } from "@tanstack/react-query";
import { ORDERS_API_URL } from "../api-urls";

async function fetchOrder(request: OrderRequest): Promise<OrderDto> {
    const response = await fetch(`${ORDERS_API_URL}/${request.orderNumber}`);
    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }
    return response.json();
}

export type OrderRequest = {
    orderNumber: string;
}

export function useFetchOrder(req: OrderRequest) {
    const query = useQuery({
        queryKey: [`${ORDERS_API_URL}/${req.orderNumber}`],
        queryFn: () => fetchOrder(req),
        enabled: true,
    });

    return query;
}

