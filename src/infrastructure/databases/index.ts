import { MinioService } from "../../utils/minio";
import PrismaService from "../../utils/prisma";
import RedisService from "../../utils/redis";

export type TDatabases = {
    getPrismaService(): PrismaService;
    getRedisService(): RedisService;
    getMinioService(): MinioService;
}

export class Databases implements TDatabases {
  private redis: RedisService;
  private prisma: PrismaService;
  private minio: MinioService;
  constructor(prisma: PrismaService, redis: RedisService, minio: MinioService){
    this.redis = redis;
    this.prisma = prisma;
    this.minio = minio;
  }

  public getPrismaService(): PrismaService {
    return this.prisma;
  }

  public getRedisService():  RedisService {
    return this.redis;
  }

  public getMinioService(): MinioService {
    return this.minio;
  }

    
}