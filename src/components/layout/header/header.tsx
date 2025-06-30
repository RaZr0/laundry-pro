import { Logo } from "@/components/logo";
import { Notification } from "../../notification";
import { Hamburger } from "./hamburger";

export function Header() {
    return (
        <header className='fixed top-0 w-screen bg-background flex items-center justify-between px-4 border border-b-2 h-[var(--header-height)]'>
            <Hamburger />
            <Logo />
            <Notification />
        </header>);
}