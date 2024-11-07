import PrismaService from "../../utils/prisma";
import RedisService from "../../utils/redis";

export type TDatabases = {
    getPrismaService(): PrismaService
    getRedisService(): RedisService
}

export class Databases implements TDatabases {
  private redis: RedisService;
  private prisma: PrismaService;
  constructor(prisma: PrismaService, redis: RedisService){
    this.redis = redis;
    this.prisma = prisma;
  }

  public getPrismaService(): PrismaService {
    return this.prisma;
  }

  public getRedisService():  RedisService {
    return this.redis;
  }

    
}