import { Customer } from "@/types/customer";

type AddressProps = {
    customer: Customer;
}

export function Address({ customer }: AddressProps) {
    return (
        <span>{`${customer.street ? `${customer.street},` : ''} ${customer.city || ''}`}</span>
    );
}