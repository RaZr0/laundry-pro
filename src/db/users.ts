import { PrismaClient } from "./prisma/generated/client";

export async function createUser({ id, email, name }: { id: string, email: string, name: string }) {
  try {
    return await new PrismaClient().user.create({
      data: {
        id,
        email,
        name,
      }
    })
  }
  catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
} 