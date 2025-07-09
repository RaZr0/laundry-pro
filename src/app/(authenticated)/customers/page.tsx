'use client'

import { Page } from "@/components/page";
import { useFetchCustomers } from "@/hooks/actions/customers/queries/useFetchCustomers";
import { CustomersView } from "./_components/customers-view";
import { TitleActions } from "./_components/title-actions";

export default function CustomersPage() {
  const { data } = useFetchCustomers();

  return (
    <Page title="לקוחות" titleActions={<TitleActions />}>
      <CustomersView data={data}/>
    </Page>
  );
}

