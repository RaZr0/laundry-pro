import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

type SettingItemProps = {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
}

export function SettingItem({ icon, title, description }: SettingItemProps) {
    return (
        <Card className="flex flex-row items-center justify-between hover:shadow-md transition-shadow cursor-pointer p-4">
            <div className="flex items-center gap-2">
                <div className="bg-[#EEEEEE] text-[#020817] p-3 rounded-full">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-lg">{title}</span>
                    <span className="text-sm text-muted-foreground">{description}</span>
                </div>
            </div>
            <ChevronLeft className="text-muted-foreground" size={20} />
        </Card>
    );
}