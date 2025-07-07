import { User } from "@clerk/nextjs/server";
import { PrismaClient, Customer } from "./prisma/generated/client";

export async function getAll(user: User): Promise<Customer[]> {
    try {
        return await new PrismaClient().customer.findMany(
            {
                where: {
                    user: {
                        every: {
                            email: user.primaryEmailAddress?.emailAddress,
                        }
                    }
                },
                include: {
                    orders: {
                        include: {
                            orderItems: {
                                include: { 
                                    product: true
                                }
                            }
                        }
                    },
                }
            },
        );
    }
    catch (error) {
        console.error("Error fetching customers:", error);
        throw new Error("Failed to fetch customers");
    }
}

export async function getById(user: User, id: string): Promise<Customer | null> {
    try {
        return await new PrismaClient().customer.findUnique({
            where: {
                id,
                user: {
                    some: {
                        email: user.primaryEmailAddress?.emailAddress
                    }
                }
            },
            include: {
                orders: {
                    include : {
                        orderItems : {
                            include : { 
                                product: true
                            }
                        }
                    }
                },
            }
        });
    }
    catch (error) {
        console.error("Error fetching customer by ID:", error);
        throw new Error("Failed to fetch customer by ID");
    }
}

export async function createCustomer(user: User, customer: Omit<Customer, 'id' | 'orders'>) {
    const prisma = new PrismaClient();
    try {
        await prisma.customer.create({
            data: {
                id: `C${(await prisma.customer.count() + 1).toString().padStart(3, '0')}`,
                ...customer,
                user: {
                    connect: {
                        email: user.primaryEmailAddress?.emailAddress
                    }
                }
            }
        });

    }
    catch (error) {
        console.error("Error creating customer:", error);
        throw new Error("Failed to create customer");
    }
}