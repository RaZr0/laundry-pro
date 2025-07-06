import { PageContent } from "./page-content";
import { PageTitle } from "./page-title";

type PageProps = {
    title?: React.ReactNode;
    titleActions?: React.ReactNode;
    children?: React.ReactNode;
}

export function Page({ title, titleActions, children }: PageProps) {
    return (
        <div className="container max-w-full flex flex-col gap-8">
            <PageTitle actions={titleActions}>
                {title}
            </PageTitle>
            <PageContent>
                {children}
            </PageContent>
        </div>
    );
}