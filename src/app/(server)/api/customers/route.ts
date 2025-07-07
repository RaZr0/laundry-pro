import { createCustomer, getAll, getById } from "@/db/customers";
import { currentUser, User } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const user = await currentUser();
    let res;
    if (request.nextUrl.searchParams.get("id")) {
        const customer = await getById(user as User, request.nextUrl.searchParams.get("id") as string);
        res = customer;
    }
    else {
        const customers = await getAll(user as User);
        res = customers.map(c => c);
    }
    return Response.json(res);
}

export async function POST(request: Request) {
    const user = await currentUser();
    await createCustomer(user as User, await request.json());
    return new Response();
}