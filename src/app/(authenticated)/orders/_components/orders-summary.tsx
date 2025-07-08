import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OrdersSummary as OrdersSummaryData } from "@/types/order";

function OrderSummary({ title, value }: { title: string, value: React.ReactNode }) {
    return (
        <Card>
            <span className="text-sm font-medium">{title}</span>
            <span className="text-2xl font-bold">{value}</span>
        </Card>
    );
}

type OrdersSummaryProps = {
    data?: OrdersSummaryData;
}

function SummarySkeleton() {
     return <Skeleton className="h-[100px]" />
}

export function OrdersSummary({ data }: OrdersSummaryProps) {
    return (
        <div className="grid md:grid-cols-4 gap-4">
            {data ? <>
                <OrderSummary title="סך הזמנות" value={data.total} />
                <OrderSummary title="בטיפול" value={data.inProgress} />
                <OrderSummary title="מוכן" value={data.ready} />
                <OrderSummary title="הושלם" value={data.completed} />
            </> : <>
                <SummarySkeleton />
                <SummarySkeleton />
                <SummarySkeleton />
                <SummarySkeleton />
            </>}

        </div>
    );
}