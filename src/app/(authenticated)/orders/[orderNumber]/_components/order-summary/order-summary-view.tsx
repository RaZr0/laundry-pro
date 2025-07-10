'use client';

import { Card, CardTitle } from "@/components/ui/card";
import { OrderPriceSummary } from "./order-price-summary";
import { OrderSummaryTable } from "./order-summary-table/order-summary-table";
import { useIsMobile } from "@/hooks/useIsMobile";
import { OrderSummaryList } from "./order-summary-list";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderDto } from "@/dtos/orders/order.dto";

type OrderSummaryViewProps = {
    data?: OrderDto;
}

export function OrderSummaryView({ data }: OrderSummaryViewProps) {
    const isMobile = useIsMobile();

    if (!data) {
        return <Skeleton className="h-[400px] w-full" />;
    }

    return (
        <Card>
            <CardTitle>
                פריטי הזמנה
            </CardTitle>
            <div className="flex flex-col gap-6">
                {isMobile ? <OrderSummaryList data={data.orderItems} /> : <OrderSummaryTable data={data.orderItems} />}
                <div className="flex justify-end">
                    <OrderPriceSummary data={data} />
                </div>
            </div>

        </Card>
    );
}