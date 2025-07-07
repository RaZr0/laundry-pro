"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Order } from "@/types/order";
import { OrdersHistoryList } from "./orders-history-list";
import { OrdersHistoryTable } from "./orders-history-table/orders-history-table";
import { Card, CardTitle } from "@/components/ui/card";

type OrdersHistoryViewProps = {
    data: Order[];
}

export function OrdersHistoryView({ data }: OrdersHistoryViewProps) {
    const isMobile = useIsMobile();

    return (
        <Card>
            <CardTitle>
                היסטוריית הזמנות
            </CardTitle>
            {isMobile ? <OrdersHistoryList data={data} /> : <OrdersHistoryTable data={data} />}
        </Card>
    );
}