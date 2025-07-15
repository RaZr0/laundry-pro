import { createServiceCategory, getAll } from "@/db/service-categories";
import { currentUser, User } from "@clerk/nextjs/server";

export async function GET() {
    const user = await currentUser();
    const serviceCategories = await getAll(user as User);
    return Response.json(serviceCategories);
}

export async function POST(request: Request) {
    const user = await currentUser();
    await createServiceCategory(user as User, await request.json());
    return new Response();
}