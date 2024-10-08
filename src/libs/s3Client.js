import {S3} from '@aws-sdk/client-s3'

const endpoint = process.env.ENDPOINT

export const s3Client = new S3({
  endpoint,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  }
})