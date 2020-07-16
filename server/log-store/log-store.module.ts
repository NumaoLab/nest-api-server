import { Module } from '@nestjs/common';
import { LogStoreController } from './log-store.controller';
import { LogStoreService } from './log-store.service';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [MinioClientModule],
  providers: [LogStoreService],
  controllers: [LogStoreController]
})
export class LogStoreModule { }
