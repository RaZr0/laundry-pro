'use client'

import { Page } from "@/components/page";
import { OrdersView } from "./_components/orders-view";
import { useFetchOrders } from "@/hooks/actions/orders/queries/useFetchOrders";
import { useFetchOrdersSummary } from "@/hooks/actions/orders/queries/useFetchOrdersSummary";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

function TitleActions() {
    const router = useRouter();

    function onCreateNewOrderClick() {
        router.push('/orders/new');
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

    return (
        <Page title="הזמנות" titleActions={<TitleActions />}>
            <OrdersView orders={orders} summary={summary} />
        </Page>
    );
}