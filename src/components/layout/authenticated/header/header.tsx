import { Logo } from "@/components/logo";
import { Notification } from "@/components/notification";
import { Hamburger } from "./hamburger";

export function Header() {
    return (
        <header className='fixed top-0 w-screen bg-background flex items-center justify-between px-4 border border-b h-[var(--header-height)]'>
            <Hamburger />
            <Logo />
            <Notification />
        </header>);
}