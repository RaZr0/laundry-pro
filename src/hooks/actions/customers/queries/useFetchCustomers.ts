import { CustomerDto } from "@/dtos/customers/customer.dto";
import { useQuery } from "@tanstack/react-query";
import { CUSTOMERS_API_URL } from "../api-urls";

async function fetchCustomers(): Promise<CustomerDto[]> {
    try{
        const res = await fetch(CUSTOMERS_API_URL);
        return res.json();

    }
    catch (error) {
        throw error;
    }
}

export function useFetchCustomers() {
    const query = useQuery({
        queryKey: [CUSTOMERS_API_URL],
        queryFn: fetchCustomers,
        enabled: true,
    });

    return query;
}