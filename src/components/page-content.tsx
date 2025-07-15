import { cn } from "@/lib/utils";

export function PageContent({
  children,
  className
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
    return (
        <div className={cn('px-6', className)}>
            {children}
        </div>
    );
}