import { queryClient } from "@/app/query-client";
import { CreateProductDto } from "@/dtos/product.dto";
import { useMutation } from "@tanstack/react-query";
import { PRODUCTS_API_URL } from "../api-urls";

async function createProduct(request: CreateProductDto): Promise<void> {
    try {
        const res = await fetch(PRODUCTS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
            throw new Error('Failed to create product');
        }
    } catch (error) {
        throw error;
    }
}

export function useCreateProduct() {
    const mutation = useMutation({
        mutationFn: async (data: CreateProductDto) => {
            return createProduct(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCTS_API_URL] });
        }
    });

    return mutation;
}

