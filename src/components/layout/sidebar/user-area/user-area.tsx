import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";
import { ReactElement, ReactNode } from "react";
import { Notification } from "../../../notification";
import { LoggedUser, LoggedUserMobile } from "./logged-user";
import { LogOut, Settings } from "lucide-react";
import { ROUTES } from "@/app/routes";
import { layoutStore } from "@/stores/layout.store";

const ICON_SIZE = 20;

interface UserLinkItemProps {
   icon: ReactElement;
   link: string;
   children?: ReactNode;
}

function UserLinkItem({ icon, link, children }: UserLinkItemProps) {
   return <li>
      <Link href={link} className='flex items-center gap-3 py-3 px-3 text-muted-foreground text-sm font-medium' onClick={() => layoutStore.toggleSidebar()}>
         {icon}
         <span>
            {children}
         </span>
      </Link>
   </li>
}

export function UserArea() {
   const isMobile = useIsMobile();
   return (
      <div className="p-4">
         {!isMobile && <div className="flex justify-between items-center">
            <Notification />
            <LoggedUser />
         </div>}
         {isMobile && <div className="flex flex-col gap-2">
            <LoggedUserMobile />
            <ul>
               <UserLinkItem icon={<Settings size={ICON_SIZE} />} link={ROUTES.settings.link}>
                  הגדרות
               </UserLinkItem>
               <UserLinkItem icon={<LogOut size={ICON_SIZE} />} link="">
                  התנתק
               </UserLinkItem>
            </ul>
         </div>}
      </div>
   );
}