import { Page } from "@/components/page";
import { getById } from "@/db/customers";
import { Customer } from "@/types/customer";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CustomerDetails } from "./_components/customer-details";
import { CustomerPrefrences } from "./_components/customer-prefrences";
import { OrdersHistoryView } from "./_components/orders-history/orders-history-view";

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
  const customer = await getById(user as User, id) as Customer;

  if (!customer) {
    return redirect('/customers');
  }

  return (
    <Page title={<PageTitle customer={customer as Customer} />}>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        <div className="flex flex-col gap-6">
          <CustomerDetails customer={customer} />
          <CustomerPrefrences customer={customer} />
        </div>
        <div className="overflow-x-hidden">
          <OrdersHistoryView data={customer.orders} />
        </div>
      </div>
    </Page>
  );
}