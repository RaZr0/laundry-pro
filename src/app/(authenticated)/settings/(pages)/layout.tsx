import { ROUTES } from "@/app/routes";
import { PageContent } from "@/components/page-content";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PageContent className="flex flex-col pt-6 flex-1">
            <div className="flex flex-col gap-4 w-full">
                <Link href={ROUTES.settings.link} replace>
                    <Button variant="outline" className="self-start">
                        חזרה להגדרות
                    </Button>
                </Link>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </PageContent>
    );
}
