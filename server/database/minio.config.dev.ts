import { MinioOptions } from 'nestjs-minio-client/dist/interfaces/minio.options.interface';

export const uri = "localhost";
export const options: MinioOptions = {
    endPoint: uri,
    port: 9000,
    useSSL: false,
    accessKey: 'mimamori',
    secretKey: 'mimamori',
};
