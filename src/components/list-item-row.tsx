import { cn } from "@/lib/utils";

export function ListItemRow({ label, value, className }: { label: string, value: React.ReactNode, className?: string }) {
    return (
        <div className={cn('flex gap-2 text-sm', className)}>
            <span className="text-muted-foreground">{label}: </span>
            <span>{value}</span>
        </div>
    );
}