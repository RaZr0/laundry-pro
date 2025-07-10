import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUp, ArrowUpRight } from "lucide-react";

const ARROW_SIZE = 12;

function getChangeStatus(change: number): 'negative' | 'positive' | 'neutral' {
    if (change < 0) {
        return 'negative';
    }

    if (change > 0) {
        return 'positive';
    }

    return 'neutral';
}

function StatusChange(change: number) {
    const changeStatus = getChangeStatus(change);

    function getChangeStatusColor(status: string): string {
        switch (status) {
            case 'negative':
                return 'text-red-600';
            case 'positive':
                return 'text-green-600';
            default:
                return 'text-gray-500';
        }
    }

    return <span className={cn('flex items-center mt-1 text-sm', getChangeStatusColor(changeStatus))}>
        {changeStatus === 'negative' && <ArrowDownLeft size={ARROW_SIZE} />}
        {changeStatus === 'positive' && <ArrowUpRight size={ARROW_SIZE} />}
        {changeStatus === 'neutral' && <ArrowUp size={ARROW_SIZE} />}
        {
            changeStatus !== 'neutral' ? (changeStatus === 'positive' ? '+' : '-') : ''
        }
        {Math.abs(change)}%
    </span>
}

export function StatItemSkeleton() {
    return <Skeleton className="h-[120px] w-full rounded-2xl" />
}

export type StatCardProps = {
    title: string;
    value: number;
    change: number;
    icon?: React.ReactNode;
}

export function StatItem({ title, value, change, icon }: StatCardProps) {
    return (
        <Card className="min-w-[240px]">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-muted-foreground mb-1">{title}</p>
                    <h2 className="text-3xl font-bold">{value}</h2>
                    {StatusChange(change)}
                </div>
                {icon}
            </div>
        </Card>
    );
}