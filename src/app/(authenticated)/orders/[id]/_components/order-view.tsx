import { Order } from "@/types/order";
import { CustomerDetails } from "./customer-details";
import { OrderActions } from "./order-actions";
import { OrderSummaryView } from "./order-summary/order-summary-view";

type OrderViewProps = {
    data?: Order;
}

export function OrderView({ data }: OrderViewProps) {
    return (
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
            <div className="flex flex-col gap-6">
                <CustomerDetails data={data} />
            </div>
            <div className="flex flex-col gap-6 overflow-x-hidden">
                <OrderSummaryView data={data} />
                <OrderActions data={data} />
            </div>
        </div>
    );
}