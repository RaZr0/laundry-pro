import { Separator } from "./ui/separator";

type PageTitleProps = {
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export function PageTitle({ children, actions }: PageTitleProps) {
    return (
        <div className="flex flex-col bg-background">
            <div className="flex justify-between items-center px-6 h-[var(--header-height)]">
                <h1 className='flex items-center text-xl font-bold'>
                    {children}
                </h1>
                {actions && <div>{actions}</div>}
            </div>
            <Separator />
        </div>
    );
}