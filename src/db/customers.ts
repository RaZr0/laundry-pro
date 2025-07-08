import { User } from "@clerk/nextjs/server";
import { PrismaClient, Customer } from "./prisma/generated/client";

export async function getAll(user: User): Promise<Customer[]> {
    try {
        return await new PrismaClient().customer.findMany(
            {
                where: {
                    user: {
                        email: user.primaryEmailAddress?.emailAddress,
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

export async function getByCustomerNumber(user: User, customerNumber: string): Promise<Customer | null> {
    try {
        return await new PrismaClient().customer.findUnique({
            where: {
                customerNumber,
                user: {
                    email: user.primaryEmailAddress?.emailAddress
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
        });
    }
    catch (error) {
        console.error("Error fetching customer by ID:", error);
        throw new Error("Failed to fetch customer by ID");
    }
}

export async function createCustomer(user: User, customer: Omit<Customer, 'id' | 'customerNumber' | 'orders' | 'userId'>) {
    const prisma = new PrismaClient();
    try {
        const userCustomers = await prisma.customer.findMany({
            where: {
                user: {
                    email: user.primaryEmailAddress?.emailAddress
                }
            }
        })

        await prisma.customer.create({
            data: {
                ...customer,
                customerNumber: `C${(userCustomers.length + 1).toString().padStart(3, '0')}`,
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