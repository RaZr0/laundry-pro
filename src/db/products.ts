import { ProductDto } from "@/dtos/product.dto";
import { User } from "@clerk/nextjs/server";
import { PrismaClient } from "./prisma/generated/client";

export async function getAll(user: User): Promise<ProductDto[]> {
    try {
        return await new PrismaClient().product.findMany({
            where: {
                    user: {
                        email: user.primaryEmailAddress?.emailAddress,
                    }
            },
            include: {
                serviceCategory: true
            },
        });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
}