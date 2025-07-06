"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User } from "lucide-react";
import React, { useState } from "react";
import { UserMenu } from "./user-menu";
import { useClerk } from "@clerk/nextjs";

export function LoggedUser() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user } = useClerk();
    return (
        <Popover open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <PopoverTrigger asChild>
                <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md">
                    <User size={16} />
                    <span className="text-sm font-medium">{user?.fullName}</span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[224px] p-0">
                <UserMenu />
            </PopoverContent>
        </Popover>
    )
}

function LoggedUserMobile() {
    const { user } = useClerk();

    return (
        <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-muted">
                <User />
            </div>
            <div className="flex flex-col">
                <span className="font-medium">{user?.fullName}</span>
                <span className="text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
        </div>
    );
}

LoggedUser.Mobile = LoggedUserMobile;