"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { customersStore } from "../customers-store";
import { CustomersList } from "./customers-list/customers-list";
import { CustomersTable } from "./customers-table/customers-table";
import { CUSTOMER_COLUMNS } from "./customers-table/customers-table-columns";
import { useRouter } from "next/navigation";
import { Customer } from "@/app/(server)/types/customer";

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
            {isMobile ? <CustomersList data={customers} onCustomerClick={handleCustomerClick} /> : <CustomersTable columns={CUSTOMER_COLUMNS} data={customers} onRowClick={handleCustomerClick} />}
        </div>
    );
})