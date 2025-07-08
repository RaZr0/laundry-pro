'use client';

import { Card, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/order";
import { OrderPriceSummary } from "./order-price-summary";
import { OrderSummaryTable } from "./order-summary-table/order-summary-table";
import { useIsMobile } from "@/hooks/useIsMobile";
import { OrderSummaryList } from "./order-summary-list";

type OrderSummaryViewProps = {
    data: Order;
}

export function OrderSummaryView({ data }: OrderSummaryViewProps) {
    const isMobile = useIsMobile();
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