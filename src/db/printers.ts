import { User } from "@clerk/nextjs/server";
import { PrismaClient } from "./prisma/generated/client";

export async function getAll(user : User){
    try {
        const printers = await new PrismaClient().printer.findMany({
            where : {
                user : {
                    email: user.primaryEmailAddress?.emailAddress,
                }
            }
        })

        return printers;
    }
    catch (error) {
        console.error("Error fetching printers:", error);
        throw new Error("Failed to fetch printers");
    }
}