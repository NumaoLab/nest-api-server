import { Injectable } from "@nestjs/common";
import { BufferedFile } from "../minio-client/file.model";
import { MinioClientService } from "../minio-client/minio-client.service";

@Injectable()
export class LogStoreService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingle(file: BufferedFile) {
    console.log("============Updated File============");
    console.log(file);
    console.log("===================================");
    if (file) {
      await this.minioClientService.upload(file);
      console.log("Uploaded!");
    } else {
      console.log("File is Empty!");
    }
    return {
      uploadedFileOriginalname: file?.originalname,
      message: `${(file && "Successfully uploaded to MinIO S3") ||
        "File is empty"}`,
    };
  }
}
