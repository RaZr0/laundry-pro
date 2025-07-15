import { cn } from "@/lib/utils";
import { LucideImage } from "lucide-react";
import { ComponentProps } from "react";

export function ProductImagePlaceholder({ ...props }: ComponentProps<typeof LucideImage>) {
    return <LucideImage {...props} className={cn("text-muted-foreground !w-full !h-full", props.className)} />;
}