import api from './api';
import axios from 'axios';

export const uploadFile = async (file: File, parentId?: string) => {
  // 1. Get presigned URL
  const { data: { uploadUrl, key } } = await api.post('/resources/upload-url', {
    fileName: file.name,
    contentType: file.type
  });

  // 2. Upload to S3
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type
    }
  });

  // 3. Confirm with BE
  const { data } = await api.post('/resources/confirm-upload', {
    name: file.name,
    parentId,
    key
  });

  return data;
};
