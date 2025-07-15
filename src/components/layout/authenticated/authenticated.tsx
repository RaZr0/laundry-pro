"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { observer } from "mobx-react-lite";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import Main from "./main/main";
import { Sidebar, SIDEBAR_WIDTH } from "./sidebar/sidebar";
import { useEffect, useState } from "react";

export const AuthenticatedLayout = observer(({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const isMobile = useIsMobile();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {isMobile && <Header />}
            {!isMobile ? <div className="fixed"><Sidebar /></div> : <Sidebar.Mobile />}
            <Main style={{
                marginRight: !isMobile ? SIDEBAR_WIDTH : '',
            }}>
                {children}
            </Main>
            {isMobile && <Footer />}
        </div>
    );
});