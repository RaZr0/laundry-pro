import { useQuery } from "@tanstack/react-query";
import { PRINTERS_API_URL } from "../api-urls";

async function fetchPrinters(): Promise<void> {
    const response = await fetch(PRINTERS_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch printers');
    }
    return response.json();
}

export function useFetchPrinters() {
    const query = useQuery({
        queryKey: [PRINTERS_API_URL],
        queryFn: () => fetchPrinters(),
        enabled: true,
    });

    return query;
}

