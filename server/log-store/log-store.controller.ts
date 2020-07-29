import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import {
  FileInterceptor
} from "@nestjs/platform-express"
import { ApiUseTags, ApiImplicitBody } from "@nestjs/swagger";
import { LogStoreService } from './log-store.service';
import { BufferedFile } from '../minio-client/file.model';

@ApiUseTags("log-store")
@Controller('log-store')
export class LogStoreController {
  constructor(
    private logStoreService: LogStoreService
  ) { }

  @Post("mimamori")
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile() file: BufferedFile
  ) {
    const uploadRes =  await this.logStoreService.uploadSingle(file);
    return uploadRes;
  }
}
