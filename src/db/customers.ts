import { Customer } from "@/app/(server)/types/customer";
import { User } from "@clerk/nextjs/server";
import { PrismaClient } from "./prisma/generated/client";

export async function getAll(user: User) {
    try {
        return await new PrismaClient().customer.findMany(
            {
                where: {
                    user: {
                        every: {
                            id: user.id
                        }
                    }
                },
                include: {
                    orders: true,
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
                        id: user.id
                    }
                }
            },
            include: {
                orders: true,
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
                        id: user.id
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