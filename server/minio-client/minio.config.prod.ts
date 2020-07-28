import { MinioOptions } from 'nestjs-minio-client/dist/interfaces/minio.options.interface';

export const uri = "localhost";
export const bucket = "test";
export const port = 9001;
export const options: MinioOptions = {
  endPoint: uri,
  port: 9001,
  useSSL: false,
  accessKey: '${process.env.MINIO_ACCESS_KEY}',
  secretKey: '${process.env.MINIO_SECRET_KEY}',
  signatureVersion: 'v4',
};
