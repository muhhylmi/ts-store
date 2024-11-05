import { PrismaClient } from "@prisma/client";

export type TDatabases = {
    getPrismaClient(): PrismaClient
}