import { getAll } from "@/db/customers";
import { currentUser, User } from "@clerk/nextjs/server";
import { Customer } from "./interfaces/customer";

export async function GET() {
    const user = await currentUser();
    const customers = await getAll(user as User);
    const res : Customer[] = customers.map(c => c);
    return Response.json(res);
}