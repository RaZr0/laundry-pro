import { getByCustomerNumber } from "@/db/customers";
import { currentUser, User } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const user = await currentUser();
    const customer = await getByCustomerNumber(user as User, (await params).id);
    return Response.json(customer);
}