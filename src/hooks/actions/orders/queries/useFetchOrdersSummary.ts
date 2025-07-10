import { OrdersSummaryDto } from "@/dtos/orders/orders-summary.dto";
import { useQuery } from "@tanstack/react-query";
import { ORDERS_SUMMARY_API_URL } from "../api-urls";

async function fetchOrdersSummary(): Promise<OrdersSummaryDto> {
    const response = await fetch(ORDERS_SUMMARY_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch orders summmary');
    }
    return response.json();
}

export function useFetchOrdersSummary() {
    const query = useQuery({
        queryKey: [ORDERS_SUMMARY_API_URL],
        queryFn: fetchOrdersSummary,
        enabled: true,
    });

    return query;
}

