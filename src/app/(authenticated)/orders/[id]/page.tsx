'use client'

import { OrderStatus } from "@/components/order-status";
import { Page } from "@/components/page";
import { useFetchOrder } from "@/hooks/actions/orders/queries/useFetchOrder";
import { Order } from "@/types/order";
import { formatDateAndTime } from "@/utils/dates";
import { redirect, useParams } from "next/navigation";
import { OrderView } from "./_components/order-view";
import { Skeleton } from "@/components/ui/skeleton";

function PageTitle({ data }: { data?: Order }) {

    if(!data) {
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
        <Page title={<PageTitle data={order as Order} />}>
            <OrderView data={order as Order} />
        </Page>
    );
}