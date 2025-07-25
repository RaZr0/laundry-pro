"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { OrdersHistoryList } from "./orders-history-list";
import { OrdersHistoryTable } from "./orders-history-table/orders-history-table";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderDto } from "@/dtos/orders/order.dto";

type OrdersHistoryViewProps = {
    data?: OrderDto[];
    onOrderClick?: (order: OrderDto) => void;
}

export function OrdersHistoryView({ data, onOrderClick }: OrdersHistoryViewProps) {
    const isMobile = useIsMobile();

    if(!data){
        return <Skeleton className="h-[400px] w-full"/>
    }

    return (
        <Card>
            <CardTitle>
                היסטוריית הזמנות
            </CardTitle>
            {isMobile ? <OrdersHistoryList data={data} onOrderClick={onOrderClick}/> : <OrdersHistoryTable data={data} onRowClick={onOrderClick}/>}
        </Card>
    );
}