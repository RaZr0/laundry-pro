import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_API_URL } from "../api-urls";

async function fetchProducts() {
    const response = await fetch(PRODUCTS_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

export function useFetchProducts() {
    const query = useQuery({
        queryKey: [PRODUCTS_API_URL],
        queryFn: fetchProducts,
        enabled: true,
    });

    return query;
}

