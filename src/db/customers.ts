import { User } from "@clerk/nextjs/server";
import { PrismaClient } from "./prisma/generated/client";

export async function getAll(user: User) {
    const customers = await new PrismaClient().customer.findMany(
        {
            where: {
                user: {
                    every: {
                        id: user.id
                    }
                }
            },
            include : {
                orders: true,
            }
        },
    );

    return customers;
}