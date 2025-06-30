import { ClipboardList, House, Receipt, ShoppingBag, Truck, Users } from "lucide-react";
import { NavItem } from "./nav-item";
import { ROUTES } from "@/app/routes";

const ICON_SIZE = 20;

export function Navigation() {
    return (
        <nav className="p-4">
            <ul className="flex flex-col gap-1">
                <NavItem icon={<House size={ICON_SIZE} />} link={ROUTES.dashboard.link}>
                    התובנות שלי
                </NavItem>
                <NavItem icon={<Users size={ICON_SIZE} />} link={ROUTES.customers.link}>
                    לקוחות
                </NavItem>
                <NavItem icon={<ClipboardList size={ICON_SIZE} />} link={ROUTES.orders.link}>
                    הזמנות
                </NavItem>
                <NavItem icon={<Truck size={ICON_SIZE} />} link={ROUTES.shippings.link}>
                    ניהול משלוחים
                </NavItem>
                <NavItem icon={<Receipt size={ICON_SIZE} />} link={ROUTES.accounts.link}>
                    ניהול חשבונות
                </NavItem>
                <NavItem icon={<ShoppingBag size={ICON_SIZE} />} link={ROUTES.newOrder.link}>
                    הזמנה חדשה
                </NavItem>
            </ul>
        </nav>
    );
}