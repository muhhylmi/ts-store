import { PrismaClient } from "@prisma/client";
import logger from "./logger";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
prisma.$use(async (params, next) => {
    const startTime = Date.now();
    const result = await next(params);
    const endTime = Date.now();
  
    logger.info(`Query ${params.model}.${params.action} took ${endTime - startTime}ms`);
  
    return result;
  });

export default prisma;