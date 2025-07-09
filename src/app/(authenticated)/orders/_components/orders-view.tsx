"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";
import { OrdersList } from "./orders-list/orders-list";
import { OrdersTable } from "./orders-table/orders-table";
import { OrdersSummary } from "./orders-summary";
import { Skeleton } from "@/components/ui/skeleton";
import { OrdersSummaryDto } from "@/dtos/orders/orders-summary.dto";
import { OrderDto } from "@/dtos/orders/order.dto";

type OrdersViewProps = {
    orders?: OrderDto[];
    summary?: OrdersSummaryDto;
}

export function OrdersView({ orders , summary}: OrdersViewProps) {
    const isMobile = useIsMobile();
    const router = useRouter();

    function handleOrderClick(order: OrderDto) {
        router.push(`/orders/${order.orderNumber}`);
    }

    return (
        <div className="flex flex-col gap-6">
            {<OrdersSummary data={summary} />}
            {orders ? (isMobile ? <OrdersList data={orders} onOrderClick={handleOrderClick} /> : <OrdersTable data={orders} onRowClick={handleOrderClick} />) : <Skeleton className="h-[400px] w-full" />}
        </div>
    );
}