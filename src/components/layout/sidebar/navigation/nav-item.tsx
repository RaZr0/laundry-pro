import { cn } from "@/lib/utils";
import { layoutStore } from "@/stores/layout.store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, ReactNode } from "react";

interface NavItemProps {
    icon: ReactElement;
    link: string;
    children?: ReactNode;
}

export function NavItem({ icon, link, children }: NavItemProps) {
    const pathname = usePathname();
    const isActive = pathname.includes(link);

    return (
        <li>
            <Link href={link} className={cn('flex items-center gap-3 py-3 px-3 text-primary text-sm font-medium rounded-md', isActive ? 'bg-primary/10' : 'text-muted-foreground hover:bg-muted hover:text-foreground')} onNavigate={() =>layoutStore.toggleSidebar() }>
                {icon}
                <span>
                    {children}
                </span>
            </Link>
        </li>
    );
}