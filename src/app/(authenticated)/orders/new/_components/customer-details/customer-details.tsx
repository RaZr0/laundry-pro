'use client';

import { Card, CardTitle } from "@/components/ui/card";
import { CustomerPicker } from "./customer-picker";
import { useFetchCustomers } from "@/hooks/actions/customers/queries/useFetchCustomers";
import { CustomerDto } from "@/dtos/customers/customer.dto";

type CustomerDetailsProps = {
    onSelectedCustomer?: (customer: CustomerDto) => void;
}

export function CustomerDetails({ onSelectedCustomer }: CustomerDetailsProps) {
    const { data } = useFetchCustomers();

    return (  
        <Card>
            <CardTitle className="text-2xl">
                פרטי לקוח
            </CardTitle>
            <div>
                <CustomerPicker customers={data} onSelected={onSelectedCustomer}/>
            </div>
        </Card>
    );
}