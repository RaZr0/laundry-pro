import { Customer } from "@/app/(server)/types/customer";
import { Address } from "@/components/address";
import { Card, CardTitle } from "@/components/ui/card";

type CustomerDetailsProps = {
    customer: Customer;
}

function Detail({ title, value }: { title: string, value: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2 justify-between">
            <span className="text-lg font-medium">{title}</span>
            {value}
        </div>
    );

}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
    return (
        <Card>
            <CardTitle>
                פרטי לקוח
            </CardTitle>
            <div className="flex flex-col gap-6">
                <Detail title="Email" value={customer.email} />
                <Detail title="מספר טלפון" value={<span style={{
                    direction: 'ltr',
                    textAlign: 'right',
                }}>{customer.phone}</span>} />
                <Detail title="כתובת" value={<Address city={customer.city} street={customer.street}/>} />
            </div>
        </Card>
    );
}