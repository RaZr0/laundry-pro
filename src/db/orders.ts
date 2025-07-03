import { PrismaClient } from "./prisma/generated/client";

export function getAllByCustomer(customerId?: string) {
    return new PrismaClient().orders.findMany({
        where: {
            customerId: customerId,
        },
        include: {
            customer: true,
        },
    });
}