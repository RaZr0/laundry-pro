import { useQuery } from "@tanstack/react-query";

async function fetchOrders() {
    const response = await fetch('/api/orders');
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return response.json();
}

export function useFetchOrders() {
    const query = useQuery({
        queryKey: ['api/orders'],
        queryFn: fetchOrders,
        enabled: true,
    });

    return query;
}

