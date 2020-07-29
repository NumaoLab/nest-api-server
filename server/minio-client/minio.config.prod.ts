import { MinioOptions } from 'nestjs-minio-client/dist/interfaces/minio.options.interface';

export const uri = "minio";
export const bucket = "mimamori";
export const port = 9000;
export const options: MinioOptions = {
  endPoint: uri,
  port: port,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
};
