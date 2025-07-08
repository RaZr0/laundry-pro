import { Customer } from "@/types/customer";

type AddressProps = {
    data: Customer;
}

export function Address({ data }: AddressProps) {
    return (
        <span>{`${data.street ? `${data.street},` : ''} ${data.city || ''}`}</span>
    );
}