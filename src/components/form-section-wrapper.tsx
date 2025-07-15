import { Card, CardTitle } from "@/components/ui/card";

export function FormSectionWrapper({ title, children }: { title: string, children: React.ReactNode }) {
    return <Card className="gap-4">
        <CardTitle className="text-2xl">
            {title}
        </CardTitle>
        {children}
    </Card>
}
