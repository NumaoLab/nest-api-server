import { MinioOptions } from 'nestjs-minio-client/dist/interfaces/minio.options.interface';

export const uri = "minio";
export const bucket = "test";
export const port = 9000;
export const options: MinioOptions = {
  endPoint: uri,
  port: 9000,
  useSSL: false,
  accessKey: '${process.env.MINIO_ACCESS_KEY}',
  secretKey: '${process.env.MINIO_SECRET_KEY}',
  signatureVersion: 'v4',
};
