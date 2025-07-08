'use client';

import { queryClient } from "@/app/query-client";
import { Button, ButtonProps } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateOrderStatus } from "@/hooks/actions/orders/mutations/useUpdateOrderStatus";
import { cn } from "@/lib/utils";
import { Order, OrderStatus } from "@/types/order";
import { ArrowRight, Check, Clock, Package, X } from "lucide-react";
import { useState } from "react";

function Action({ children, ...props }: ButtonProps) {
    return (
        <Button {...props} className={cn('flex gap-4 !px-4', props.className)} >
            {children}
        </Button>
    );
}

type OrderActionsProps = {
    data?: Order;
}

export function OrderActions({ data }: OrderActionsProps) {
    const [loadingActionStatus, setLoadingActionStatus] = useState<OrderStatus>();
    const mutation = useUpdateOrderStatus();

    async function handleActionClick(status: OrderStatus) {
        setLoadingActionStatus(status);
        try {
            await mutation.mutateAsync({ orderNumber: (data as Order).orderNumber, status });
            queryClient.invalidateQueries({ queryKey: [`api/orders/${(data as Order).orderNumber}`] });
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
                <Action variant="outline" disabled={data.status === 'in_progress'} isLoading={mutation.isPending && loadingActionStatus === 'in_progress'} onClick={() => handleActionClick('in_progress')}>
                    <Clock />
                    סמן כבטיפול
                </Action>
                <Action variant="outline" disabled={data.status === 'ready'} isLoading={mutation.isPending && loadingActionStatus === 'ready'} onClick={() => handleActionClick('ready')}>
                    <Package />
                    סמן כמוכן
                </Action>
                <Action variant="outline" disabled={data.status === 'in_delivery'} isLoading={mutation.isPending && loadingActionStatus === 'in_delivery'} onClick={() => handleActionClick('in_delivery')}>
                    <ArrowRight />
                    סמן כיצא למשלוח
                </Action>
                <Action variant="outline" disabled={data.status === 'completed'} isLoading={mutation.isPending && loadingActionStatus === 'completed'} onClick={() => handleActionClick('completed')}>
                    <Check />
                    סמן כהושלם
                </Action>
                <Action variant="outline" disabled={data.status === 'cancelled'} isLoading={mutation.isPending && loadingActionStatus === 'cancelled'} className="text-destructive" onClick={() => handleActionClick('cancelled')}>
                    <X />
                    בטל הזמנה
                </Action>
            </div>
        </Card>
    );
}