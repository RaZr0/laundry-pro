import { Separator } from "@/components/ui/separator";
import { Order } from "@/types/order";
import { calculateOrderTotal } from "@/utils/order";
import { formatPrice } from "@/utils/price";

type OrderPriceSummaryProps = {
    data: Order;
}


export function OrderPriceSummary({ data }: OrderPriceSummaryProps) {
    const startingPrice = calculateOrderTotal(data);
    const discount = 0;
    const tax = (startingPrice * 18) / 100;
    const totalPrice = startingPrice - discount + tax;
    return (  
        <div className="flex-1 flex flex-col gap-2 text-left max-w-[320px]">
            <div className="flex justify-between">
                <span>סכום ביניים:</span>
                <span>{formatPrice(startingPrice)}</span>
            </div>
            <div className="flex justify-between">
                <span>הנחה:</span>
                <span>{formatPrice(discount)}</span>
            </div>
            <div className="flex justify-between">
                <span>מס:</span>
                <span>{formatPrice(tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
                <span>סה״כ:</span>
                <span>{formatPrice(totalPrice)}</span>
            </div>
        </div>
    );
}