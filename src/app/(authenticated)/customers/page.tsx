'use client'

import { Page } from "@/components/page";
import { CustomerDto } from "@/dtos/customers/customer.dto";
import { useFetchCustomers } from "@/hooks/actions/customers/queries/useFetchCustomers";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";
import { CustomersList } from "./_components/customers-list/customers-list";
import { CustomersTable } from "./_components/customers-table/customers-table";
import { TitleActions } from "./_components/title-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/app/routes";

export default function CustomersPage() {
  const { data } = useFetchCustomers();

  const isMobile = useIsMobile();
  const router = useRouter();

  function handleCustomerClick(customer: CustomerDto) {
    router.push(`${ROUTES.customers.link}/${customer.customerNumber}`);
  }

  return (
    <Page title="לקוחות" titleActions={<TitleActions />}>
      {data ? (isMobile ? <CustomersList data={data} onCustomerClick={handleCustomerClick} /> : <CustomersTable data={data} onRowClick={handleCustomerClick} />) : <Skeleton className="h-[400px] w-full" />}
    </Page>
  );
}

