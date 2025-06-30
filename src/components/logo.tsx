import Image from "next/image";
import logo from "@/assets/icons/logo.png";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/">
            <Image alt="Logo" src={logo} width={170} />
        </Link>
    );
}