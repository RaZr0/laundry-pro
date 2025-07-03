import { Card } from "@/components/ui/card";
import { Customer } from "../../types/customer";
import { CustomerIcon } from "../customer-icon";
import { TotalOrdersPrice } from "../total-orders-price";
import { LastOrder } from "../last-order";

type CustomersListProps = {
    data: Customer[];
}

function CustomerItem({ customer }: { customer: Customer }) {
    return (
        <Card className="p-4 gap-3">
            <div className="flex gap-2 items-center">
                <CustomerIcon />
                <div>
                    <span className="font-medium text-lg">{customer.name}</span>
                </div>
            </div>
            <div className="flex flex-col text-sm gap-1">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">חובות וזיכויים: </span>
                    <TotalOrdersPrice orders={customer.orders} />
                </div>
                <div>
                    <span className="text-muted-foreground">הזמנות: </span>
                    <span>{customer.orders.length}</span>
                </div>
                <div>
                    <span className="text-muted-foreground">הזמנה אחרונה: </span>
                    <LastOrder orders={customer.orders} />
                </div>
            </div>
        </Card>
    );
}

export function CustomersList({ data }: CustomersListProps) {
    return (
        <ul className="flex flex-col gap-4">
            {data.map(customer => (
                <li key={customer.id}>
                    <CustomerItem customer={customer} />
                </li>
            ))}
        </ul>
    );
}