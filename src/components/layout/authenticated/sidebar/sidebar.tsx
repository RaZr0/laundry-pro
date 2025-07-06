"use client";

import { layoutStore } from "@/stores/layout.store";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Navigation } from "./navigation/navigation";
import { UserArea } from "./user-area/user-area";
import { useIsMobile } from "@/hooks/useIsMobile";
import { observer } from "mobx-react-lite";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const SIDEBAR_WIDTH = '256px';

export function Sidebar() {
    const isMobile = useIsMobile();
    return (
        <aside className="w-[256px] shrink-0 z-10 max-lg:fixed h-dvh flex flex-col bg-background border-l"
            style={{ width: SIDEBAR_WIDTH }}
        >
            <button className="absolute right-4 top-4 lg:hidden cursor-pointer opacity-70" onClick={() => layoutStore.toggleSidebar()}>
                <X size={16} />
            </button>
            <div className='flex flex-col items-center py-3 px-6 h-[var(--header-height)]'>
                <Logo />
            </div>
            <div>
                <Separator />
                <Navigation />
            </div>
            <div className="mt-auto">
                <Separator />
                {isMobile ? <UserArea.Mobile /> : <UserArea />}
            </div>
        </aside>
    );
}

Sidebar.Mobile = observer(() => {
    return <Sheet open={layoutStore.isSidebarOpen} onOpenChange={(open) => { layoutStore.toggleSidebar(open) }}>
        <SheetTitle className="sr-only"></SheetTitle>
        <SheetContent style={{ width: SIDEBAR_WIDTH }}>
            <Sidebar />
        </SheetContent>
    </Sheet>
})