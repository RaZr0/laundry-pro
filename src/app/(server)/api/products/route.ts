import { getAll } from "@/db/products";
import { currentUser, User } from "@clerk/nextjs/server";

export async function GET() {
    const user = await currentUser();
    const products = await getAll(user as User);
    return Response.json(products);
}
