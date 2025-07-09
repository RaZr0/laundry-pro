import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomerDto } from "@/dtos/customers/customer.dto";

type CustomerPrefrencesProps = {
    data?: CustomerDto;
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