import { User } from "@clerk/nextjs/server";
import { CreateOrderDto } from "../dtos/orders/create-order";
import { Order, PrismaClient } from "./prisma/generated/client";
import { OrdersSummaryDto } from "@/dtos/orders/orders-summary.dto";

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

export async function getSummary(user: User): Promise<OrdersSummaryDto> {
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

export async function createOrder(user: User, orderDto: CreateOrderDto) {
    try {
        const prisma = new PrismaClient();
        const orders = await prisma.order.findMany({
            where: {
                customer: {
                    id: orderDto.customerId,
                    user: {
                        email: user.primaryEmailAddress?.emailAddress,
                    }
                }
            }
        })

        await prisma.$transaction(async (tx) => {
            const orderCreated = await tx.order.create({
                data: {
                    orderNumber: `ORD-${(orders.length + 1).toString().padStart(4, '0')}`,
                    notes: orderDto.notes,
                    customerId: orderDto.customerId,
                    status: "in_progress",
                },
            });

            await Promise.all(orderDto.orderItems.map(async item => {
                const product = await tx.product.findUnique({
                    where : {
                        id: item.productId,
                        userId: user.id,
                    }
                })

                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }

                await tx.orderItem.create({
                    data: {
                        price: product.price,
                        quantity: item.quantity,
                        productId: item.productId,
                        notes: item.notes,
                        orderId: orderCreated.id,
                    },
                })
            }

            ));
        });

        return new Response();
    }
    catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    }
}