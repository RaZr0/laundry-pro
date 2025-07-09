import { OrderDto } from "@/dtos/orders/order.dto";
import { calculateBalance } from "@/utils/customer";
import { formatPrice } from "@/utils/price";
import { CreditCard } from "lucide-react";

export function CustomerBalance({ orders }: { orders: OrderDto[] }) {
    const balance = calculateBalance(orders);
    return (
        <div className='flex gap-2 items-center'>
            <span className={balance !== 0 ? ( balance < 0 ? 'text-red-600' : 'text-green-600') : ''}>{formatPrice(balance)}</span>
            <span><CreditCard size={16} /></span>
        </div>
    );
}