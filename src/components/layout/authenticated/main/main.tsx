import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

function Main({
    children,
    ...props
}: Readonly<{
    children: React.ReactNode;
}> & ComponentProps<'main'>) {
    
    return ( 
        <main {...props} className={cn('flex-1 flex bg-[#FAFAFA] max-lg:mt-[var(--header-height)] max-lg:pb-[calc(var(--footer-height)+60px)] overflow-x-hidden', props.className)}>{children}</main>
     );
}

export default Main;