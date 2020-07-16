import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as devConfig from './minio.config.dev';
import * as prodConfing from './minio.config.prod';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  constructor(
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  private readonly logger: Logger;
  private readonly baseBucket = process.env.NODE_ENV === "development" ? devConfig.bucket : prodConfing.bucket;
  public get client() {
    return this.minio.client;
  }

  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
    if (!file.mimetype.includes('zip')) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    }
    let temp_filename = Date.now();
    // let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename: string = `${temp_filename + ext}`;
    const fileBuffer = file.buffer;
    this.client.putObject(baseBucket, filename, fileBuffer, metaData, (err: any, res: any) => {
      if (err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    })
    const config = process.env.NODE_ENV === "development" ? devConfig : prodConfing;

    return {
      url: `${config.uri}:${config.port}/${config.bucket}/${filename}`
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function (err: any, res: any) {
      if (err) throw new HttpException("Oops Something wrong happend", HttpStatus.BAD_REQUEST)
    })
  }
}
