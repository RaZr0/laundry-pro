import { PageContent } from "./page-content";
import { PageTitle } from "./page-title";

type PageProps = {
    title?: string;
    children?: React.ReactNode;
}

export function Page({ title, children }: PageProps) {
    return (
        <div className="container max-w-full flex flex-col gap-8">
            <PageTitle>
                {title}
            </PageTitle>
            <PageContent>
                {children}
            </PageContent>
        </div>
    );
}