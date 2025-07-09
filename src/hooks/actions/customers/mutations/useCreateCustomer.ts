import { CreateCustomerDto } from "@/dtos/customers/create-customer.dto";
import { useMutation } from "@tanstack/react-query";

async function createCustomer(request: CreateCustomerDto): Promise<void> {
    try {
        const res = await fetch('/api/customers', {
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
    });

    return mutation;
}

