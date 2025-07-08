import { PrismaClient } from "@/db/prisma/generated/client";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const user = await currentUser();
    const { status } = await request.json()
    const { id } = await params;
    console.log(id, status);
    await new PrismaClient().order.update({
        data: {
            status
        },
        where: {
            orderNumber: id,
            customer: {
                user: {
                    email: user?.primaryEmailAddress?.emailAddress,
                }
            }
        },
    })
    return new Response();
}