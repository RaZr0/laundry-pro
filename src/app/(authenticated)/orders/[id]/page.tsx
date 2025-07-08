import { OrderStatus } from "@/components/order-status";
import { Page } from "@/components/page";
import { getByOrderNumber } from "@/db/orders";
import { Order } from "@/types/order";
import { formatDateAndTime } from "@/utils/dates";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { OrderView } from "./_components/order-view";

type OrderPageProps = {
    params: Promise<{ id: string }>;
};

function PageTitle({ data }: { data: Order }) {
    return <div className="flex flex-col gap-1">
        <span>{`הזמנה ${data.orderNumber}`}</span>
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-normal">
            <OrderStatus order={data} />
            •
            <span>{formatDateAndTime(data.createdAt)}</span>
        </div>
    </div>;
}

export default async function OrderPage({ params }: OrderPageProps) {
    const { id } = await params;
    const user = await currentUser();
    const order = await getByOrderNumber(user as User, id) as unknown as Order;

    if (!order) {
        return redirect('/orders');
    }

    return (
        <Page title={<PageTitle data={order} />}>
            <OrderView data={order} />
        </Page>
    );
}