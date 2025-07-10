import { CustomerDto } from "@/dtos/customers/customer.dto";
import { useQuery } from "@tanstack/react-query";
import { CUSTOMERS_API_URL } from "../api-urls";

async function fetchCustomer(request: FetchCustomerRequest): Promise<CustomerDto> {
    try {
        const res = await fetch(`${CUSTOMERS_API_URL}/${request.customerNumber}`);
        if (!res.ok) {
            throw new Error('Failed to fetch customer');
        }
        return res.json();
    } catch (error) {
        throw error;
    }
}

type FetchCustomerRequest = {
    customerNumber: string;
}

export function useFetchCustomer(req: FetchCustomerRequest) {
    const query = useQuery({
        queryKey: [`${CUSTOMERS_API_URL}/${req.customerNumber}`],
        queryFn: () => fetchCustomer(req),
        enabled: true,
    });

    return query;
}

