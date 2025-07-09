import { useQuery } from "@tanstack/react-query";

async function fetchProducts() {
    const response = await fetch('/api/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

export function useFetchProducts() {
    const query = useQuery({
        queryKey: ['api/products'],
        queryFn: fetchProducts,
        enabled: true,
    });

    return query;
}

