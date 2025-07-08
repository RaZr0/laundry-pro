import { Customer } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";

async function fetchCustomers(): Promise<Customer[]> {
    try{
        const res = await fetch('/api/customers');
        return res.json();

    }
    catch (error) {
        throw error;
    }
}

export function useFetchCustomers() {
    const query = useQuery({
        queryKey: ['api/customers'],
        queryFn: fetchCustomers,
        enabled: true,
    });

    return query;
}