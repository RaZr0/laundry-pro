import { Customer } from "@/app/(server)/types/customer";
import { Page } from "@/components/page";
import { getById } from "@/db/customers";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CustomerDetails } from "./_components/customer-details";
import { CustomerPrefrences } from "./_components/customer-prefrences";
import { OrdersHistoryTable } from "./_components/orders-history-table/orders-history-table";

type CustomerPageProps = {
  params: Promise<{ id: string }>;
};

function PageTitle({ customer }: { customer: Customer }) {
  return <div className="flex flex-col">
    <span>{`${customer.firstName} ${customer.lastName}`}</span>
    <span className="text-sm font-normal text-muted-foreground">{customer.id}</span>
  </div>;
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params;
  const user = await currentUser();
  const customer = await getById(user as User, id);

  if (!customer) {
    return redirect('/customers');
  }

  return (
    <Page title={<PageTitle customer={customer as Customer} />}>
      <div className="grid grid-cols-[1fr_2fr] gap-6">
        <div className="flex flex-col gap-4">
          <CustomerDetails customer={customer} />
          <CustomerPrefrences customer={customer} />
        </div>
        <div>
          <OrdersHistoryTable data={customer.orders} />
        </div>
      </div>
    </Page>
  );
}