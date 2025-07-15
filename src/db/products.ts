import { CreateProductDto, ProductDto } from "@/dtos/product.dto";
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
                serviceCategory: true,
                priceUnit: true,
            },
        });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
}

export async function createProduct(user: User, dto: CreateProductDto): Promise<void> {
    try {
        await new PrismaClient().product.create({
            data: {
                name: dto.name,
                price: dto.price,
                imageUrl: dto.imageUrl ?? null,
                user: {
                    connect: {
                        email: user.primaryEmailAddress?.emailAddress,
                    }
                },
                serviceCategory: {
                    connect: {
                        id: dto.serviceCategoryId,
                    }
                },
                priceUnit: dto.priceUnitId ? {
                    connect: {
                        id: dto.priceUnitId,
                    }
                } : undefined,
            },
        });
    }
    catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
    }
}