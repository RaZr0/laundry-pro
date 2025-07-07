import { User } from "@clerk/nextjs/server";
import { PrismaClient, Order } from "./prisma/generated/client";

export async function getAllByCustomer(user: User, customerId?: string): Promise<Order[] | null> {
    try {
        return await new PrismaClient().order.findMany({
            where: {
                customer: {
                    id: customerId,
                    user: {
                        every: {
                            email: user.primaryEmailAddress?.emailAddress,
                        },
                    }
                }
            },
            include: {
                customer: true,
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
    }

}