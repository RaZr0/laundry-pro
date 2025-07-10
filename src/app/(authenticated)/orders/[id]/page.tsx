'use client'

import { OrderStatus } from "@/components/order-status";
import { Page } from "@/components/page";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderDto } from "@/dtos/orders/order.dto";
import { useFetchOrder } from "@/hooks/actions/orders/queries/useFetchOrder";
import { formatDateAndTime } from "@/utils/dates";
import { redirect, useParams } from "next/navigation";
import { CustomerDetails } from "./_components/customer-details";
import { OrderActions } from "./_components/order-actions";
import { OrderSummaryView } from "./_components/order-summary/order-summary-view";

function PageTitle({ data }: { data?: OrderDto }) {
    if (!data) {
        return <Skeleton className="h-[50px] w-[200px]" />;
    }

    return <div className="flex flex-col gap-1">
        <span>{`הזמנה ${data.orderNumber}`}</span>
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-normal">
            <OrderStatus order={data} />
            •
            <span>{formatDateAndTime(data.createdAt)}</span>
        </div>
    </div>;
}

export default function OrderPage() {
    const { id } = useParams();
    const { data: order, isLoading } = useFetchOrder({ id: id as string });

    if (!order && !isLoading) {
        return redirect('/orders');
    }

    return (
        <Page title={<PageTitle data={order} />}>
            <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
                <div className="flex flex-col gap-6">
                    <CustomerDetails data={order} />
                </div>
                <div className="flex flex-col gap-6 overflow-x-hidden">
                    <OrderSummaryView data={order} />
                    <OrderActions data={order} />
                </div>
            </div>
        </Page>
    );
}