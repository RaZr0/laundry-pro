'use client';

import { Page } from "@/components/page";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchCustomer } from "@/hooks/actions/customers/queries/useFetchCustomer";
import { redirect, useParams, useRouter } from "next/navigation";
import { CustomerDetails } from "./_components/customer-details";
import { CustomerPrefrences } from "./_components/customer-prefrences";
import { OrdersHistoryView } from "./_components/orders-history/orders-history-view";
import { CustomerDto } from "@/dtos/customers/customer.dto";
import { OrderDto } from "@/dtos/orders/order.dto";
import { ROUTES } from "@/app/routes";

function PageTitle({ data }: { data?: CustomerDto }) {
  if(!data){
    return <Skeleton className="h-[50px] w-[200px]"/>
  }
  return <div className="flex flex-col">
    <span>{`${data.firstName} ${data.lastName}`}</span>
    <span className="text-sm font-normal text-muted-foreground">{data.customerNumber}</span>
  </div>;
}

export default function CustomerPage() {
  const { customerNumber } = useParams();
  const { data , isLoading} = useFetchCustomer({ customerNumber: customerNumber as string });
  const router = useRouter();

  if (!data && !isLoading) {
    return redirect('/customers');
  }

  function handleOrderClick(order: OrderDto) {
    router.push(`${ROUTES.orders.link}/${order.orderNumber}`);
  }

  return (
    <Page title={<PageTitle data={data} />}>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        <div className="flex flex-col gap-6">
          <CustomerDetails data={data} />
          <CustomerPrefrences data={data} />
        </div>
        <div className="overflow-x-hidden">
          <OrdersHistoryView data={data?.orders} onOrderClick={handleOrderClick}/>
        </div>
      </div>
    </Page>
  );
}