import { PrismaClient } from "@prisma/client";
import { Logging } from "./logger";
import { TDatabases } from "../infrastructure/databases";

class PrismaService implements TDatabases {
  private prisma: PrismaClient;
  private logger: Logging;

  constructor(logger: Logging) {
    this.logger = logger;
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });

    // Middleware untuk logging query time
    this.prisma.$use(async (params, next) => {
      const startTime = Date.now();
      const result = await next(params);
      const endTime = Date.now();
      
      this.logger.logInfo(`Query ${params.model}.${params.action} took ${endTime - startTime}ms`);
      
      return result;
    });
  }

  // Method untuk akses langsung PrismaClient, misal prismaService.client.user.findMany()
  getPrismaClient(): PrismaClient {
    return this.prisma;
  }

  // Menutup koneksi Prisma dengan database
  async disconnect() {
    await this.prisma.$disconnect();
    this.logger.logInfo('Prisma disconnected');
  }
}

export default PrismaService;
