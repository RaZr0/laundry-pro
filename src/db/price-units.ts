import { PrismaClient } from "./prisma/generated/client";

export async function getAll() {
    try {
        return await new PrismaClient().priceUnit.findMany();
    } catch (error) {
        console.error("Error fetching service price units:", error);
        throw new Error("Failed to fetch price units");
    }
}
