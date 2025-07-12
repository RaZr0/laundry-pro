import { createOrder, getAll } from "@/db/orders";
import { sendPrintJob } from "@/external/api/printings/printing";
import { currentUser, User } from "@clerk/nextjs/server";
import { readFile } from "fs/promises";
import path from "path";

async function getExamplePdfBase64() {
    const pdfPath = path.resolve('./public/files/laundry_receipt.pdf')
    const pdfBuffer = await readFile(pdfPath)
    const base64 = pdfBuffer.toString('base64')

    return base64;
}


export async function GET() {
    const user = await currentUser();
    const orders = await getAll(user as User);
    return Response.json(orders);
}


export async function POST(request: Request) {
    const user = await currentUser();
    const createdOrder = await createOrder(user as User, await request.json());
    const base64 = await getExamplePdfBase64();
    await sendPrintJob({ userId: createdOrder.userId, printer: 'Microsoft Print to PDF', base64 });
    return Response.json({
        orderNumber: createdOrder.orderNumber
    });
}
