import { User } from "@clerk/nextjs/server";
import { PrismaClient, Order } from "./prisma/generated/client";
import { OrdersSummary } from "@/types/order";

export async function getAll(user: User): Promise<Order[]> {
    try {
        return await new PrismaClient().order.findMany({
            where: {
                customer: {
                    user: {
                        email: user.primaryEmailAddress?.emailAddress,
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

export async function getByOrderNumber(user: User, orderNumber: string): Promise<Order | null> {
    try {
        return await new PrismaClient().order.findUnique({
            where: {
                orderNumber,
                customer: {
                    user: {
                        email: user.primaryEmailAddress?.emailAddress,
                    }
                }
            },
            include: {
                customer: true,
                orderItems: {
                    include: {
                        product: {
                            include: {
                                serviceCategory: true,
                            },
                        },
                    },
                },
            },
        });
    }
    catch (error) {
        console.error("Error fetching order by ID:", error);
        throw new Error("Failed to fetch order by ID");
    }
}

export async function getSummary(user: User): Promise<OrdersSummary> {
    try {
        const orders = await new PrismaClient().order.findMany({
            where: {
                customer: {
                    user: {
                        email: user.primaryEmailAddress?.emailAddress,
                    }
                }
            },
        });

        return {
            total: orders.length,
            inProgress: orders.filter(order => order.status === "in_progress").length,
            ready: orders.filter(order => order.status === "ready").length,
            completed: orders.filter(order => order.status === "completed").length,
        }
    }
    catch (error) {
        console.error("Error fetching orders summary:", error);
        throw new Error("Failed to fetch orders summary");
    }
}