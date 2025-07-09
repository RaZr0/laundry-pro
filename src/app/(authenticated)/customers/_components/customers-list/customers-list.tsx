import { Card } from "@/components/ui/card";
import { CustomerIcon } from "../customer-icon";
import { CustomerBalance } from "../customer-balance";
import { LastOrder } from "../last-order";
import { cn } from "@/lib/utils";
import { ListItemRow } from "@/components/list-item-row";
import { CustomerDto } from "@/dtos/customers/customer.dto";

function CustomerItem({ customer, onClick }: { customer: CustomerDto, onClick?: () => void }) {
    return (
        <Card className={cn('gap-3', onClick ? 'cursor-pointer hover:bg-muted/50' : '')} onClick={onClick}>
            <div className="flex gap-2 items-center">
                <CustomerIcon />
                <div className="flex flex-col">
                    <span className="font-medium text-lg">{`${customer.firstName} ${customer.lastName}`}</span>
                    <span className="text-sm text-muted-foreground">{customer.customerNumber}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <ListItemRow label="חובות וזיכויים" value={<CustomerBalance orders={customer.orders} />} className="flex justify-between" />
                <ListItemRow label="הזמנות" value={customer.orders.length} />
                <ListItemRow label="הזמנה אחרונה" value={<LastOrder orders={customer.orders} />} />
            </div>
        </Card>
    );
}

type CustomersListProps = {
    data: CustomerDto[];
    onCustomerClick?: (customer: CustomerDto) => void;
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