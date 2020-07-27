import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinioModule } from 'nestjs-minio-client';
import * as typeormDevConfig from "./typeorm.config.dev";
import * as typeormProdConfig from "./typeorm.config.prod";

function typeormDynamicModule() {
  const isDev = process.env.NODE_ENV === "development";
  const { options } = isDev ? typeormDevConfig : typeormProdConfig;
  return TypeOrmModule.forRoot(options);
}



@Module({
  imports: [typeormDynamicModule()],
})
export class DatabaseModule { }
