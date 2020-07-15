import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinioModule } from 'nestjs-minio-client';
import * as mongooseDevConfig from "./mongo.config.dev";
import * as mongooseProdConfig from "./mongo.config.prod";
import * as typeormDevConfig from "./typeorm.config.dev";
import * as typeormProdConfig from "./typeorm.config.prod";
import * as minioDevConfig from "./minio.config.dev";
import * as minioProdConfig from "./minio.config.prod";

function mongooseDynamicModule() {
  const isDev = process.env.NODE_ENV === "development";
  const { uri, options } = isDev ? mongooseDevConfig : mongooseProdConfig;
  return MongooseModule.forRoot(uri, options);
}

function typeormDynamicModule() {
  const isDev = process.env.NODE_ENV === "development";
  const { options } = isDev ? typeormDevConfig : typeormProdConfig;
  return TypeOrmModule.forRoot(options);
}

function minioModule() {
  const isDev = process.env.NODE_ENV === "development";
  const { options } = isDev ? minioDevConfig : minioProdConfig;
  return MinioModule.register(options);
}

@Module({
  imports: [mongooseDynamicModule(), typeormDynamicModule(), minioModule()],
})
export class DatabaseModule { }
