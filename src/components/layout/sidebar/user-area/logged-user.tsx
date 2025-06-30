import { User } from "lucide-react";

export function LoggedUser() {
    return (
        <button className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md">
            <User size={16} />
            <span className="text-sm font-medium">Admin</span>
        </button>);
}

export function LoggedUserMobile() {
    return (
        <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-muted">
                <User />
            </div>
            <div className="flex flex-col">
                <span className="font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@laundrypro.com</span>
            </div>
        </div>
    );
}