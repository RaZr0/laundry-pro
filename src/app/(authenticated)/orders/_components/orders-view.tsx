"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Order, OrdersSummary as OrdersSummaryData } from "@/types/order";
import { useRouter } from "next/navigation";
import { OrdersList } from "./orders-list/orders-list";
import { OrdersSummary } from "./orders-summary";
import { OrdersTable } from "./orders-table/orders-table";

type OrdersViewProps = {
    data: {
        summary: OrdersSummaryData;
        orders: Order[];
    }
}

export function OrdersView ({ data }: OrdersViewProps) {
    const isMobile = useIsMobile();
    const router = useRouter();

    function handleOrderClick(order: Order) {
        router.push(`/orders/${order.orderNumber}`);
    }

    return (
        <div className="flex flex-col gap-6">
            <OrdersSummary data={data.summary} />
            {isMobile ? <OrdersList data={data.orders} onOrderClick={handleOrderClick} /> : <OrdersTable data={data.orders} onRowClick={handleOrderClick} />}
        </div>
    );
}