import { OrderDto } from "@/dtos/orders/order.dto";
import { useQuery } from "@tanstack/react-query";
import { ORDERS_API_URL } from "../api-urls";

async function fetchOrders():Promise<OrderDto[]> {
    const response = await fetch(ORDERS_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return response.json();
}

export function useFetchOrders() {
    const query = useQuery({
        queryKey: [ORDERS_API_URL],
        queryFn: fetchOrders,
        enabled: true,
    });

    return query;
}

