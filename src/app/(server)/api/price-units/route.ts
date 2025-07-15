import { getAll } from "@/db/price-units";

export async function GET() {
    const priceUnits = await getAll();
    return Response.json(priceUnits);
}
