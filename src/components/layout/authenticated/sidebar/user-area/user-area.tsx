import { ROUTES } from "@/app/routes";
import { layoutStore } from "@/stores/layout.store";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { ReactElement, ReactNode } from "react";
import { Notification } from "../../../../notification";
import { LoggedUser } from "./logged-user";
import { useClerk } from "@clerk/nextjs";

const ICON_SIZE = 20;

type UserLinkItemProps = {
   icon: ReactElement;
   link: string;
   onClick?: () => void;
   children?: ReactNode;
}

function UserLinkItem({ icon, link, onClick, children }: UserLinkItemProps) {
   return <li onClick={() => onClick?.()}>
      <Link href={link} className='flex items-center gap-3 py-3 px-3 text-muted-foreground text-sm font-medium' onClick={() => layoutStore.toggleSidebar()}>
         {icon}
         <span>
            {children}
         </span>
      </Link>
   </li>
}

export function UserArea() {
   return (
      <div className="flex justify-between items-center p-4">
         <Notification />
         <LoggedUser />
      </div>
   );
}

function UserAreaMobile() {
   const { signOut } = useClerk();

   return (
      <div className="flex flex-col gap-2 p-4">
         <LoggedUser.Mobile />
         <ul>
            <UserLinkItem icon={<Settings size={ICON_SIZE} />} link={ROUTES.settings.link}>
               הגדרות
            </UserLinkItem>
            <UserLinkItem icon={<LogOut size={ICON_SIZE} />} link="" onClick={() => signOut()}>
               התנתק
            </UserLinkItem>
         </ul>
      </div>
   );
}

UserArea.Mobile = UserAreaMobile;