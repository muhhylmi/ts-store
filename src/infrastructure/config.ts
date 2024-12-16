import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
  JWTPRIVATEKEY: process.env.JWTPRIVATEKEY || "rahasia",
  MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY || "",
  MIDTRANS_BASE_URL: process.env.MIDTRANS_BASE_URL || "",
  ELASTIC_URL: process.env.ELASTIC_URL,
  PREFIX: process.env.PREFIX,
  ELASTIC_USERNAME: process.env.ELASTIC_USERNAME || 'elastic',
  ELASTIC_PASSWORD: process.env.ELASTIC_PASSWORD || 'changeme',
  ELASTIC_APM_SERVICE_NAME: process.env.ELASTIC_APM_SERVICE_NAME,
  ELASTIC_APM_SERVER_URL: process.env.ELASTIC_APM_SERVER_URL,
  NODE_ENV:  process.env.NODE_ENV || 'development',
  REDIS_URL: process.env.REDIS_URL,
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT  || "localhost",
  MINIO_PORT: process.env.MINIO_PORT,
  MINIO_ACCESSKEY: process.env.MINIO_ACCESSKEY || "minioadmin",
  MINIO_SECRETKEY: process.env.MINIO_SECRETKEY || "minioadmin"
};

export default config;