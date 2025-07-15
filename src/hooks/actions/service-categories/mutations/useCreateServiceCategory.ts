import { queryClient } from "@/app/query-client";
import { useMutation } from "@tanstack/react-query";
import { SERVICE_CATEGORIES_API_URL } from "../api-urls";
import { CreateServiceCategoryDto } from "@/dtos/service-category.dto";

async function createServiceCategory(request: CreateServiceCategoryDto): Promise<void> {
    try {
        const res = await fetch(SERVICE_CATEGORIES_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
            throw new Error('Failed to create service category');
        }
    } catch (error) {
        throw error;
    }
}

export function useCreateServiceCategory() {
    const mutation = useMutation({
        mutationFn: async (data: CreateServiceCategoryDto) => {
            return createServiceCategory(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SERVICE_CATEGORIES_API_URL] });
        }
    });

    return mutation;
}

