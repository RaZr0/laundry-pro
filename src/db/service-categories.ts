import { User } from "@clerk/nextjs/server";
import { PrismaClient } from "./prisma/generated/client";
import { CreateServiceCategoryDto } from "@/dtos/service-category.dto";

export async function getAll(user: User) {
    try {
        return await new PrismaClient().serviceCategory.findMany({
            where: {
                user: {
                    email: user.primaryEmailAddress?.emailAddress,
                }
            },
        });
    } catch (error) {
        console.error("Error fetching service categories:", error);
        throw new Error("Failed to fetch service categories");
    }
}

export async function createServiceCategory(user: User, dto: CreateServiceCategoryDto) {
    try {
        await new PrismaClient().serviceCategory.create({
            data: {
                name: dto.name,
                user: {
                    connect: {
                        email: user.primaryEmailAddress?.emailAddress,
                    }
                }
            }
        })
    }
    catch (error) {
        console.error("Error creating service category:", error);
        throw new Error("Failed to create service category");
    }
}