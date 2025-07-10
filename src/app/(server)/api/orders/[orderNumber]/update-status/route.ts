import { updateOrderStatus } from "@/db/orders";
import { currentUser, User } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ orderNumber: string }> }) {
    const user = await currentUser();
    const { status } = await request.json()
    const { orderNumber } = await params;
    await updateOrderStatus(user as User, { orderNumber, status });
    return new Response();
}