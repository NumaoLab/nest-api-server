import { Module } from "@nestjs/common";
import { MinioClientService } from "./minio-client.service";
import { MinioModule } from "nestjs-minio-client";
import * as devConfig from "./minio.config.dev";
import * as prodConfing from "./minio.config.prod";

@Module({
  imports: [
    MinioModule.register(
      process.env.NODE_ENV === "development"
        ? devConfig.options
        : prodConfing.options,
    ),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
