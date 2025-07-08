import { Page } from "@/components/page";
import { getAll, getSummary } from "@/db/orders";
import { currentUser, User } from "@clerk/nextjs/server";
import { OrdersView } from "./_components/orders-view";
import { Order } from "@/types/order";

export default async function Orders() {
    const user = await currentUser();
    const orders = await getAll(user as User) as unknown as Order[];
    const summary = await getSummary(user as User);

    return (
        <Page title="הזמנות">
            <OrdersView data={{ orders, summary }} />
        </Page>
    );
}