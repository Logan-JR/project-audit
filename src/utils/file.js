import {s3Client} from '@/libs/s3Client'
import {PutObjectCommand} from '@aws-sdk/client-s3'
import { v4 as uuid } from "uuid";

export const createFile = async (file, ruta) => {
  try {
    if(!file) throw Error('file undefined')
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuid()}.${fileExtension}`;
    const filePath = `${ruta}/${fileName}`
    const endpoint = process.env.ENDPOINT
    
    const bucketParams = {
      Bucket: `uatf-auditoria-contaduria-publica`,
      Key: filePath,
      Body: buffer,
      ACL: 'public-read'
    }

    const result = await s3Client.send(new PutObjectCommand(bucketParams))
    return `${endpoint}/${bucketParams.Bucket}/${bucketParams.Key}`;
  } catch (error) {
    console.log(error);
  }
};
