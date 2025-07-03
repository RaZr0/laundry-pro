'use client';

import { useIsMobile } from "@/hooks/useIsMobile";
import { Customer } from "../../types/customer";
import { CustomersTable } from "../customers-table/customers-table";
import { CUSTOMER_COLUMNS } from "../customers-table/customers-table-columns";
import { CustomersList } from "../customers-list/customers-list";

type CustomersViewProps = {
    data: Customer[];
}

export function CustomersView({ data }: CustomersViewProps) {
    const isMobile = useIsMobile();
    return (
        <div>
            {isMobile ? <CustomersList data={data} /> : <CustomersTable columns={CUSTOMER_COLUMNS} data={data} />}
        </div>
    );
}