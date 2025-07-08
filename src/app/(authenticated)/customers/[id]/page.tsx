import { Page } from "@/components/page";
import { getByCustomerNumber } from "@/db/customers";
import { Customer } from "@/types/customer";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CustomerDetails } from "./_components/customer-details";
import { CustomerPrefrences } from "./_components/customer-prefrences";
import { OrdersHistoryView } from "./_components/orders-history/orders-history-view";

type CustomerPageProps = {
  params: Promise<{ id: string }>;
};

function PageTitle({ data }: { data: Customer }) {
  return <div className="flex flex-col">
    <span>{`${data.firstName} ${data.lastName}`}</span>
    <span className="text-sm font-normal text-muted-foreground">{data.customerNumber}</span>
  </div>;
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params;
  const user = await currentUser();
  const customer = await getByCustomerNumber(user as User, id) as unknown as Customer;

  if (!customer) {
    return redirect('/customers');
  }

  return (
    <Page title={<PageTitle data={customer as Customer} />}>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        <div className="flex flex-col gap-6">
          <CustomerDetails data={customer} />
          <CustomerPrefrences data={customer} />
        </div>
        <div className="overflow-x-hidden">
          <OrdersHistoryView data={customer.orders} />
        </div>
      </div>
    </Page>
  );
}