import { getAll } from "@/db/printers";
import { currentUser, User } from "@clerk/nextjs/server";

export async function GET() {
    const user = await currentUser();
    const printers = await getAll(user as User);
    return Response.json(printers);
}