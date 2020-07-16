import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { BufferedFile } from '../minio-client/file.model';
import { MinioClientService } from '../minio-client/minio-client.service';


@Injectable()
export class LogStoreService {
  constructor(
    private minioClientService: MinioClientService
  ) { }

  async uploadSingle(file: BufferedFile) {
    console.log('service');
    console.log(file);
    let uploaded_file = await this.minioClientService.upload(file)
    return {
      url: uploaded_file.url,
      message: "Successfully uploaded to MinIO S3"
    };
  }
}
