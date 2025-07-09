import { CustomerDto } from "@/dtos/customers/customer.dto";

type AddressProps = {
    data: CustomerDto;
}

export function Address({ data }: AddressProps) {
    return (
        <span>{`${data.street ? `${data.street},` : ''} ${data.city || ''}`}</span>
    );
}