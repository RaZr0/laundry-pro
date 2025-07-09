import { createOrder, getAll } from "@/db/orders";
import { currentUser, User } from "@clerk/nextjs/server";

export async function GET() {
    const user = await currentUser();
    const orders = await getAll(user as User);
    return Response.json(orders);
}


export async function POST(request: Request) {
    const user = await currentUser();
    const createdOrder = await createOrder(user as User, await request.json());
    return Response.json({
        orderNumber: createdOrder.orderNumber
    });
}
