import { createProduct, getAll } from "@/db/products";
import { currentUser, User } from "@clerk/nextjs/server";

export async function GET() {
    const user = await currentUser();
    const products = await getAll(user as User);
    return Response.json(products);
}

export async function POST(request: Request) {
    const user = await currentUser();
    const dto = await request.json();
    await createProduct(user as User, dto);
    return new Response();
}
