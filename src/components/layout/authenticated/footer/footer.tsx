import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { ClipboardList, Home, Plus, Truck, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, ReactNode } from "react";

const ICON_SIZE = 20;

type FooterItemProps = {
    icon: ReactElement;
    link: string;
    children?: ReactNode;
}

function FooterItem({ icon, link, children }: FooterItemProps) {
    const pathname = usePathname();
    const isActive = pathname.includes(link);

    return <li className={isActive ? 'text-muted-foreground' : 'text-primary'}>
        <Link href={link} className="flex flex-col items-center justify-center gap-1">
            {icon}
            <span className="text-xs">
                {children}
            </span>
        </Link>
    </li>
}

export function Footer() {
    return (
        <footer className="h-[var(--footer-height)] fixed bottom-0 w-screen bg-background border-t px-1 py-1">
            <ul className="flex gap-4 items-center justify-between">
                <FooterItem icon={<Home size={ICON_SIZE} />} link={ROUTES.dashboard.link}>
                    התובנות שלי
                </FooterItem>
                <FooterItem icon={<Users size={ICON_SIZE} />} link={ROUTES.customers.link}>
                    לקוחות
                </FooterItem>
                <li className="relative top-[-30px]">
                    <Link href={ROUTES.newOrder.link}>
                        <Button className="h-14 rounded-full !px-6">
                            <Plus />
                        </Button>
                    </Link>
                </li>
                <FooterItem icon={<ClipboardList size={ICON_SIZE} />} link={ROUTES.orders.link}>
                    הזמנות
                </FooterItem>
                <FooterItem icon={<Truck size={ICON_SIZE} />} link={ROUTES.shippings.link}>
                    משלוחים
                </FooterItem>
            </ul>
        </footer>
    );
}