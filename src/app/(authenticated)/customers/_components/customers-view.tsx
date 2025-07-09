"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";
import { CustomersList } from "./customers-list/customers-list";
import { CustomersTable } from "./customers-table/customers-table";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomerDto } from "@/dtos/customers/customer.dto";

type CustomersViewProps = {
    data?: CustomerDto[];
}

export function CustomersView({ data }: CustomersViewProps) {
    const isMobile = useIsMobile();
    const router = useRouter();

    function handleCustomerClick(customer: CustomerDto) {
        router.push(`/customers/${customer.customerNumber}`);
    }

    return (
        <div>
            {data ? ( isMobile ? <CustomersList data={data} onCustomerClick={handleCustomerClick} /> : <CustomersTable data={data} onRowClick={handleCustomerClick} />) : <Skeleton className="h-[400px] w-full" />}
        </div>
    );
}