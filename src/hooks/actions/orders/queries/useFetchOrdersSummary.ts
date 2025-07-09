import { OrdersSummaryDto } from "@/dtos/orders/orders-summary.dto";
import { useQuery } from "@tanstack/react-query";

async function fetchOrdersSummary(): Promise<OrdersSummaryDto> {
    const response = await fetch('/api/orders/summary');
    if (!response.ok) {
        throw new Error('Failed to fetch orders summmary');
    }
    return response.json();
}

export function useFetchOrdersSummary() {
    const query = useQuery({
        queryKey: ['api/orders/summary'],
        queryFn: fetchOrdersSummary,
        enabled: true,
    });

    return query;
}

