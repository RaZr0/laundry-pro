"use client";

import { ROUTES } from "@/app/routes";
import { Separator } from "@/components/ui/separator";
import { useClerk } from "@clerk/nextjs";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

const ICON_SIZE = 16;

type MenuItemProps = {
    icon: React.ReactElement;
    link: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

function MenuItem({ icon, link, onClick, children }: MenuItemProps) {
    return <li onClick={() => onClick?.()}>
        <Link href={link} className="flex gap-2 items-center justify-end hover:bg-muted hover:text-foreground px-6 py-2 cursor-pointer">
            <span className="text-sm">
                {children}
            </span>
            {icon}
        </Link>
    </li>
}

export function UserMenu({ onItemClick }: { onItemClick?: () => void }) {
    const { user, signOut } = useClerk();

    return (
        <div className="flex flex-col">
            <div className="flex flex-col text-left p-3">
                <span className="font-medium">{user?.fullName}</span>
                <span className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
            <Separator />
            <ul onClick={() => onItemClick?.()}>
                <MenuItem link={ROUTES.settings.link} icon={<Settings size={ICON_SIZE} />}>
                    הגדרות
                </MenuItem>
                <li>
                    <Separator />
                </li>
                <MenuItem link="" icon={<LogOut size={ICON_SIZE} />} onClick={() => {
                    signOut();
                }}>
                    התנתק
                </MenuItem>
            </ul>
        </div>
    )
}