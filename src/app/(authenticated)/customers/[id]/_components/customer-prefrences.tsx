import { Customer } from "@/types/customer";
import { Card, CardTitle } from "@/components/ui/card";

type CustomerPrefrencesProps = {
    customer: Customer;
}

export function CustomerPrefrences({ customer }: CustomerPrefrencesProps) {
    return (
        <Card>
            <CardTitle>
                הערות לקוח
            </CardTitle>
            <p>{customer.prefrencesNotes}</p>
        </Card>
    );
}