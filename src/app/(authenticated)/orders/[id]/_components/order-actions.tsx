'use client';

import { Button, ButtonProps } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Order, OrderStatus } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, Clock, Package, X } from "lucide-react";
import { updateOrderStatus } from "../../services/orders.service";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

function Action({ children, ...props }: ButtonProps) {
    return (
        <Button {...props} className={cn('flex gap-4 !px-4', props.className)} >
            {children}
        </Button>
    );
}

type OrderActionsProps = {
    data: Order;
}

export function OrderActions({ data }: OrderActionsProps) {
    const [loadingActionStatus, setLoadingActionStatus] = useState<OrderStatus>();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async ({ status }: { status: OrderStatus }) => {
            setLoadingActionStatus(status);
            return updateOrderStatus(data.orderNumber, status);
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh(); // ✅ minimal flicker when used in transition
    });
        }
    });

    function handleActionClick(status: OrderStatus) {
        mutation.mutateAsync({ status });
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