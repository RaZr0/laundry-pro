import { createOrder, getAll, getByOrderNumber } from "@/db/orders";
import { Order } from "@/db/prisma/generated/client";
import { CreateOrderDto } from "@/dtos/orders/create-order";
import { OrderDto } from "@/dtos/orders/order.dto";
import { sendPrintJob } from "@/external/api/printings/printing";
import { currentUser, User } from "@clerk/nextjs/server";
import { generateOrderReciptBase64 } from "./generate-order-recipt";

export async function GET() {
    const user = await currentUser();
    const orders = await getAll(user as User);
    return Response.json(orders);
}

export async function POST(request: Request) {
    const user = await currentUser() as User;
    const createOrderDto : CreateOrderDto = await request.json();
    const { orderNumber, userId } = await createOrder(user, createOrderDto);
    const createdOrder = await getByOrderNumber(user, orderNumber) as Order;
    const base64 = await generateOrderReciptBase64({
      order : createdOrder as unknown as OrderDto
    });
    sendPrintJob({ userId, printer: 'BTP-R880NP(U) 1', base64 });
    return Response.json({
        orderNumber: orderNumber
    });
}
