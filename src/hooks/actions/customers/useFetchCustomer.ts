import { Customer } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";

async function fetchCustomer(request: FetchCustomerRequest): Promise<Customer> {
    try {
        const res = await fetch(`/api/customers/${request.id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch customer');
        }
        return res.json();
    } catch (error) {
        throw error;
    }
}

type FetchCustomerRequest = {
    id: string;
}

export function useFetchCustomer({ id }: { id: string }) {
    const query = useQuery({
        queryKey: [`api/customers/${id}`],
        queryFn: () => fetchCustomer({ id }),
        enabled: true,
    });

    return query;
}

