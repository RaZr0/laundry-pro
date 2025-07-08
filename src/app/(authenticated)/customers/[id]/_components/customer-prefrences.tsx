import { Customer } from "@/types/customer";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type CustomerPrefrencesProps = {
    data?: Customer;
}

export function CustomerPrefrences({ data }: CustomerPrefrencesProps) {
    if(!data){
        return <Skeleton className="h-[100px] w-full"/>
    }
    return (
        <Card>
            <CardTitle>
                הערות לקוח
            </CardTitle>
            <p>{data.prefrencesNotes}</p>
        </Card>
    );
}