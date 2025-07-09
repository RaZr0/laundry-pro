import { queryClient } from "@/app/query-client";
import { CreateCustomerDto } from "@/dtos/customers/create-customer.dto";
import { useMutation } from "@tanstack/react-query";

const API_URL = '/api/customers';

async function createCustomer(request: CreateCustomerDto): Promise<void> {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
            throw new Error('Failed to create customer');
        }
    } catch (error) {
        throw error;
    }
}

export function useCreateCustomer() {
    const mutation = useMutation({
        mutationFn: async (data: CreateCustomerDto) => {
            return createCustomer(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [API_URL] });
        }
    });

    return mutation;
}

