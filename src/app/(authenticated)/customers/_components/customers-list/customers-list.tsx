import { Card } from "@/components/ui/card";
import { CustomerIcon } from "../customer-icon";
import { TotalOrdersPrice } from "../total-orders-price";
import { LastOrder } from "../last-order";
import { cn } from "@/lib/utils";
import { Customer } from "@/app/(server)/types/customer";

type CustomersListProps = {
    data: Customer[];
    onCustomerClick?: (customer: Customer) => void;
}

function CustomerItem({ customer, onClick }: { customer: Customer, onClick?: () => void }) {
    return (
        <Card className={cn('gap-3', onClick ? 'cursor-pointer hover:bg-muted/50' : '')} onClick={onClick}>
            <div className="flex gap-2 items-center">
                <CustomerIcon />
                <div className="flex flex-col">
                    <span className="font-medium text-lg">{`${customer.firstName} ${customer.lastName}`}</span>
                    <span className="text-sm text-muted-foreground">{customer.id}</span>
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

export function CustomersList({ data, onCustomerClick }: CustomersListProps) {
    return (
        <ul className="flex flex-col gap-4">
            {data.map(customer => (
                <li key={customer.id}>
                    <CustomerItem customer={customer} onClick={() => onCustomerClick?.(customer)} />
                </li>
            ))}
        </ul>
    );
}