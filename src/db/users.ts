import { PrismaClient } from "./prisma/generated/client";

export function createUser({id, email, name}: {id: string, email: string, name: string}) {
  return new PrismaClient().user.create({
    data : {
        id,
        email,
        name,
    }
  })  
} 