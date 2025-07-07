"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Customer } from "@/types/customer";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { customersStore } from "../customers-store";
import { CustomersList } from "./customers-list/customers-list";
import { CustomersTable } from "./customers-table/customers-table";

type CustomersViewProps = {
    data: Customer[];
}


export const CustomersView = observer(({ data }: CustomersViewProps) => {
    const isMobile = useIsMobile();
    const [customers, setCustomers] = useState<Customer[]>(data);
    const router = useRouter();

    useEffect(() => {
        if (customersStore.data) {
            setCustomers(customersStore.data);
        }
    }, [customersStore.data])

    function handleCustomerClick(customer: Customer) {
        router.push(`/customers/${customer.id}`);
    }

    return (
        <div>
            {isMobile ? <CustomersList data={customers} onCustomerClick={handleCustomerClick} /> : <CustomersTable data={customers} onRowClick={handleCustomerClick} />}
        </div>
    );
})