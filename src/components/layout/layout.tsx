'use client';
import { useIsMobile } from "@/hooks/useIsMobile";
import { layoutStore } from "@/stores/layout.store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import Main from "./main/main";
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";
import { Footer } from "./footer/footer";

const SidebarMobile = observer(() => {
    return <Sheet open={layoutStore.isSidebarOpen} onOpenChange={(open) => { layoutStore.toggleSidebar(open) }}>
        <SheetTitle className="sr-only"></SheetTitle>
        <SheetContent className="w-[256px]">
            <Sidebar />
        </SheetContent>
    </Sheet>
})

export const Layout = observer(function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isMobile = useIsMobile();

    useEffect(() => {
        layoutStore.toggleSidebar(!isMobile)
    }, [isMobile])


    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {isMobile && <Header />} 
            {!isMobile ? <Sidebar /> : <SidebarMobile />}
            <Main>
                {children}
            </Main>
            {isMobile && <Footer />}
        </div>
    );
});