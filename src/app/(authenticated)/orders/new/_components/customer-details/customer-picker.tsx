'use client';

import { Dropdown } from "@/components/dropdown";
import { CustomerDto } from "@/dtos/customers/customer.dto";
import { useMemo } from "react";

type CustomerPickerProps = {
    customers?: CustomerDto[];
    onSelected?: (customer: CustomerDto) => void;
}

export function CustomerPicker({ customers, onSelected }: CustomerPickerProps) {
    const options = useMemo(() => {
        return customers?.map(customer => ({
            id: customer.id,
            label: `${customer.firstName} ${customer.lastName}`,
            value: customer,
        })) || [];
    }, [customers]);

    return (
        <Dropdown options={options} width={250} filter filterFunction={(filterValue, option) => (option.label as string).toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())} onSelected={(option) => onSelected?.(option?.value as CustomerDto) }/>
    );
}