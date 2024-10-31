import { PrismaClient } from "@prisma/client";
import { Logging } from "./logger";
const logger = new Logging();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
prisma.$use(async (params, next) => {
  const startTime = Date.now();
  const result = await next(params);
  const endTime = Date.now();
  
  logger.logInfo(`Query ${params.model}.${params.action} took ${endTime - startTime}ms`);
  
  return result;
});

export default prisma;