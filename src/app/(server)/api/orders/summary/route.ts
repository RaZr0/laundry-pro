import { getSummary } from "@/db/orders";
import { currentUser, User } from "@clerk/nextjs/server";

export async function GET() {
    const user = await currentUser();
    const summary = await getSummary(user as User);
    return Response.json(summary);
}
