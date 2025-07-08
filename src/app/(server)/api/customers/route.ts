import { createCustomer, getAll } from "@/db/customers";
import { currentUser, User } from "@clerk/nextjs/server";

export async function GET() {
    const user = await currentUser();
    const customers = await getAll(user as User);
    return Response.json(customers);
}

export async function POST(request: Request) {
    const user = await currentUser();
    await createCustomer(user as User, await request.json());
    return new Response();
}