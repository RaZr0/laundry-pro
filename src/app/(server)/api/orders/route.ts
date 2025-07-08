import { getAll } from "@/db/orders";
import { currentUser, User } from "@clerk/nextjs/server";

export async function GET() {
    const user = await currentUser();
    const orders = await getAll(user as User);
    return Response.json(orders);
}
