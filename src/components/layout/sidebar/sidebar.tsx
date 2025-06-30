import { layoutStore } from "@/stores/layout.store";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Navigation } from "./navigation/navigation";
import { UserArea } from "./user-area/user-area";

export function Sidebar() {
    return (
        <aside className="w-[256px] shrink-0 z-10 max-lg:fixed h-screen flex flex-col bg-background border-l">
            <button className="absolute right-4 top-4 lg:hidden cursor-pointer opacity-70" onClick={() => layoutStore.toggleSidebar()}>
                <X size={16}/>
            </button>
            <div className='flex flex-col items-center py-3 px-6 h-[var(--header-height)'>
                <Logo />
            </div>
            <div>
                <Separator />
                <Navigation />
            </div>
            <div className="mt-auto">
                <Separator />
                <UserArea />
            </div>
        </aside>
    );
}