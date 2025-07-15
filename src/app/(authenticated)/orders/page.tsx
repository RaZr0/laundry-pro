'use client'

import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderDto } from "@/dtos/orders/order.dto";
import { useFetchOrders } from "@/hooks/actions/orders/queries/useFetchOrders";
import { useFetchOrdersSummary } from "@/hooks/actions/orders/queries/useFetchOrdersSummary";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { OrdersList } from "./_components/orders-list/orders-list";
import { OrdersSummary } from "./_components/orders-summary";
import { OrdersTable } from "./_components/orders-table/orders-table";
import { ROUTES } from "@/app/routes";

function TitleActions() {
    const router = useRouter();

    function onCreateNewOrderClick() {
        router.push(`${ROUTES.orders.link}${ROUTES.orders.children.new.link}`);
    }

    return (
        <div>
            <Button onClick={onCreateNewOrderClick}>
                <Plus />
                צור הזמנה חדשה
            </Button>
        </div>
    )
}

export default function OrdersPage() {
    const { data: orders } = useFetchOrders();
    const { data: summary } = useFetchOrdersSummary();

    const isMobile = useIsMobile();
    const router = useRouter();

    function handleOrderClick(order: OrderDto) {
        router.push(`${ROUTES.orders.link}/${order.orderNumber}`);
    }

    return (
        <Page title="הזמנות" titleActions={<TitleActions />}>
            <div className="flex flex-col gap-6">
                {<OrdersSummary data={summary} />}
                {orders ? (isMobile ? <OrdersList data={orders} onOrderClick={handleOrderClick} /> : <OrdersTable data={orders} onRowClick={handleOrderClick} />) : <Skeleton className="h-[400px] w-full" />}
            </div>
        </Page>
    );
}