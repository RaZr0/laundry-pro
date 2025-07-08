'use client'

import { Page } from "@/components/page";
import { OrdersView } from "./_components/orders-view";
import { useFetchOrders } from "@/hooks/actions/orders/queries/useFetchOrders";
import { useFetchOrdersSummary } from "@/hooks/actions/orders/queries/useFetchOrdersSummary";

export default function Orders() {
    const { data: orders } = useFetchOrders();
    const { data: summary } = useFetchOrdersSummary();

    return (
        <Page title="הזמנות">
            <OrdersView orders={orders} summary={summary} />
        </Page>
    );
}