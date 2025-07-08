import { Customer } from "@/types/customer";
import { Card, CardTitle } from "@/components/ui/card";

type CustomerPrefrencesProps = {
    data: Customer;
}

export function CustomerPrefrences({ data }: CustomerPrefrencesProps) {
    return (
        <Card>
            <CardTitle>
                הערות לקוח
            </CardTitle>
            <p>{data.prefrencesNotes}</p>
        </Card>
    );
}