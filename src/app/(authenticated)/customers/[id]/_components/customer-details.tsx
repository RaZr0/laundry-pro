import { Address } from "@/components/address";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Customer } from "@/types/customer";
import { calculateBalance } from "@/utils/customer";
import { formatPrice } from "@/utils/price";
import { CreditCard } from "lucide-react";

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
                <Detail title="כתובת" value={<Address customer={customer} />} />
                <Detail title="הזמנות" value={customer.orders.length} />
                <Detail title="חובות וזיכויים" value={<div className="flex justify-between items-center gap-4">
                    <span>{formatPrice(calculateBalance(customer.orders))}</span>
                    <Button variant="outline">
                        <CreditCard />
                        שלם יתרה
                    </Button>
                </div>} />
            </div>
        </Card>
    );
}