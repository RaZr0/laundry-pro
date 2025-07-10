'use client';

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderDto, OrderStatusDto } from "@/dtos/orders/order.dto";
import { useUpdateOrderStatus } from "@/hooks/actions/orders/mutations/useUpdateOrderStatus";
import { ArrowRight, Check, Clock, Package, X } from "lucide-react";
import { useState } from "react";

type OrderActionsProps = {
    data?: OrderDto;
}

export function OrderActions({ data }: OrderActionsProps) {
    const [loadingActionStatus, setLoadingActionStatus] = useState<OrderStatusDto>();
    const mutation = useUpdateOrderStatus();

    async function handleActionClick(status: OrderStatusDto) {
        setLoadingActionStatus(status);
        try {
            await mutation.mutateAsync({ id: (data as OrderDto).id, status, orderNumber: (data as OrderDto).orderNumber });
        }
        catch (error) {
            console.log(error);
        }
    }

    if (!data) {
        return <Skeleton className="h-[100px] w-full" />
    }

    return (
        <Card>
            <CardTitle>
                פעולות הזמנה
            </CardTitle>
            <div className="flex gap-3 flex-wrap">
                <Button variant="outline" disabled={data.status === 'in_progress'} isLoading={mutation.isPending && loadingActionStatus === 'in_progress'} onClick={() => handleActionClick('in_progress')}>
                    <Clock />
                    סמן כבטיפול
                </Button>
                <Button variant="outline" disabled={data.status === 'ready'} isLoading={mutation.isPending && loadingActionStatus === 'ready'} onClick={() => handleActionClick('ready')}>
                    <Package />
                    סמן כמוכן
                </Button>
                <Button variant="outline" disabled={data.status === 'in_delivery'} isLoading={mutation.isPending && loadingActionStatus === 'in_delivery'} onClick={() => handleActionClick('in_delivery')}>
                    <ArrowRight />
                    סמן כיצא למשלוח
                </Button>
                <Button variant="outline" disabled={data.status === 'completed'} isLoading={mutation.isPending && loadingActionStatus === 'completed'} onClick={() => handleActionClick('completed')}>
                    <Check />
                    סמן כהושלם
                </Button>
                <Button variant="outline" disabled={data.status === 'cancelled'} isLoading={mutation.isPending && loadingActionStatus === 'cancelled'} className="text-destructive" onClick={() => handleActionClick('cancelled')}>
                    <X />
                    בטל הזמנה
                </Button>
            </div>
        </Card>
    );
}