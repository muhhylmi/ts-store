import * as Minio from 'minio';
import { logger } from './dependency_injection';
import { FileModel } from '../domain/model/item_model';
import { Logging } from './logger';
import { HttpException } from './exception';
import fs from 'fs';
import config from '../infrastructure/config';

export class MinioService {
  private logger: Logging;
  private minioClient: Minio.Client;

  constructor(logger: Logging){
    this.logger = logger;
    this.minioClient = this.iniMinio();
  }

  private iniMinio() {
    const minioClient = new Minio.Client({
      endPoint: config.MINIO_ENDPOINT,
      port: Number(config.MINIO_PORT),
      useSSL: false,
      accessKey: config.MINIO_ACCESSKEY,
      secretKey: config.MINIO_SECRETKEY,
    });

    return minioClient;
  }

  getMinioClient(): Minio.Client {
    return this.minioClient;
  }

  async checkExists (bucket: string) {
    const exists = await this.minioClient.bucketExists(bucket);
    if (exists) {
      logger.logInfo("Bucket already exists");
    } else {
      await this.minioClient.makeBucket(bucket, 'us-east-1');
      this.logger.logInfo('Bucket ' + bucket + ' created in "us-east-1".');
    }
  };

  async uploadToMinio (file: FileModel) {
    const params = {
      Bucket: 'ts-store',
      Key: file.originalname,
      Body: file.path,
      ContentType: file.mimetype,
    };
    try {
      await this.checkExists(params.Bucket);
      const result = await this.minioClient.fPutObject(params.Bucket, params.Key, params.Body, {'Content-Type': params.ContentType});
      this.logger.logInfo('File ' + params.Body + ' uploaded as object ' + params.Key + ' in bucket ' + params.Bucket);
      fs.unlinkSync(params.Body);
      return result;
    } catch (error) {
      this.logger.logError("minio.ts", error as string);
      fs.unlinkSync(params.Body);
      throw new HttpException(409, error as string);
    }    
  };

  async getPrivateFileUrl(file: FileModel) {
    const params = {
      Bucket: 'ts-store',
      Key: file.originalname,
      Body: file.path,
      ContentType: file.mimetype,
    };
    try {
      const imageUrl = await this.minioClient.presignedUrl('GET', params.Bucket, params.Key, 24*60*60);
      return imageUrl;
    } catch (error) {
      this.logger.logError("minio.ts", error as string);
    }

  }

  async getPublicUrl(file: FileModel) {
    const params = {
      Bucket: 'ts-store',
      Key: file.originalname,
      Body: file.path,
      ContentType: file.mimetype,
    };
    if (config.NODE_ENV != 'development'){
      return "";
    }
    return `http://${config.MINIO_ENDPOINT}:${config.MINIO_PORT}/${params.Bucket}/${params.Key}`;
  }
}

