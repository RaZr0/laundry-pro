import { Bell } from "lucide-react";

export function Notification() {
    return (
        <button className="relative cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md">
            <span className="absolute top-[4px] right-[4px] inline-block h-[8px] w-[8px] rounded-xl bg-black"></span>
            <Bell size={16} />
        </button>
    );
}