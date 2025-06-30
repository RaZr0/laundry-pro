import { Separator } from "./ui/separator";

export function PageTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-lg:hidden flex flex-col">
            <h1 className='flex items-center text-xl font-bold px-6 bg-background h-[var(--header-height)]'>
                {children}
            </h1>
            <Separator />
        </div>
    );
}