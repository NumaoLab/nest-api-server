import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as devConfig from './minio.config.dev';
import * as prodConfing from './minio.config.prod';
// import * as crypto from 'crypto';

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

  private readonly getFixedDate = () => {
    // zero padding
    const padZero = (num: number) => {
      if (num < 10) {
        return `0${num}`;
      } else {
        return `${num}`;
      }
    }

    const currentDate = new Date();
    return "" + currentDate.getFullYear() + "-" + padZero(currentDate.getMonth() + 1) +
      "-" + padZero(currentDate.getDate()) + " " + padZero(currentDate.getHours()) + ":" +
      padZero(currentDate.getMinutes()) + ":" + padZero(currentDate.getSeconds()); ``
  };

  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
    // 本当はmimeではじいた方がいいけどcurlのmimeでフィルタが難しくなるのでなんでも上げられるようにしておく
    // if (!file.mimetype.includes('zip')) {
    //   throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    // }
    const temp_filename = this.getFixedDate();
    // 必要そうなら暗号化
    // let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename: string = `${temp_filename + ext}`;
    const fileBuffer = file.buffer;
    console.log('before put object',baseBucket, filename, fileBuffer, metaData);
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
