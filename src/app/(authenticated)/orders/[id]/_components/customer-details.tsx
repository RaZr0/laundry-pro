import { Address } from "@/components/address";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderDto } from "@/dtos/orders/order.dto";

function Detail({ title, value }: { title: string, value: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2 justify-between">
            <span className="text-lg font-medium">{title}</span>
            {value}
        </div>
    );
}

function ContactInfo({ data }: { data: OrderDto }) {
    return (
        <div className="flex flex-col">
            <span>{data.customer.email}</span>
            <span style={{
                direction: 'ltr',
                textAlign: 'right',
            }}>{data.customer.phone}</span>
        </div>
    )
}

type CustomerDetailsProps = {
    data?: OrderDto;
}

export function CustomerDetails({ data }: CustomerDetailsProps) {
    if (!data) {
        return <Skeleton className="h-[400px] w-full" />;
    }
    return (
        <Card>
            <CardTitle>
                פרטי לקוח
            </CardTitle>
            <div className="flex flex-col gap-6">
                <Detail title={`${data.customer.firstName} ${data.customer.lastName}`} value={data.orderNumber} />
                <Detail title="פרטי קשר" value={<ContactInfo data={data} /> } />
                <Detail title="כתובת למשלוח" value={<Address data={data.customer} />} />
                <Detail title="כתובת לחיוב" value={"Same as shipping address"} />
            </div>
        </Card>
    );
}