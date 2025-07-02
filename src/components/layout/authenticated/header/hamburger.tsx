'use client';
import { layoutStore } from "@/stores/layout.store";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Hamburger() {
    return (
        <Button variant="outline" onClick={() => layoutStore.toggleSidebar()}>
            <Menu />
        </Button>
    );
}