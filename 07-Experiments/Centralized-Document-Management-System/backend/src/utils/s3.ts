import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3({
  endpoint: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`,
  accessKeyId: process.env.MINIO_ACCESS_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
  s3ForcePathStyle: true, // required for minio
  signatureVersion: 'v4'
});

export const getPresignedUrl = (key: string, type: 'put' | 'get', contentType?: string) => {
  const params = {
    Bucket: process.env.MINIO_BUCKET || 'documents',
    Key: key,
    Expires: 3600, // 1 hour
    ContentType: contentType
  };

  if (type === 'get') {
    delete params.ContentType;
    return s3.getSignedUrlPromise('getObject', params);
  }
  
  return s3.getSignedUrlPromise('putObject', params);
};

export default s3;
