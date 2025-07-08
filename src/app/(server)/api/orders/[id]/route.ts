import { getByOrderNumber } from "@/db/orders";
import { currentUser, User } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const user = await currentUser();
    const order = await getByOrderNumber(user as User, (await params).id);
    return Response.json(order);
}