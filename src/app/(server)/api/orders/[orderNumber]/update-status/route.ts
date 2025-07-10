import { updateOrderStatus } from "@/db/orders";
import { currentUser, User } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const user = await currentUser();
    const { status } = await request.json()
    const { id } = await params;
    await updateOrderStatus(user as User, { id, status });
    return new Response();
}