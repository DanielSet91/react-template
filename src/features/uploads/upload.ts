import { z } from 'zod';
import { apiClient } from '../../api/apiClient';

// The backend must also enforce file size/type and access permissions.
export async function uploadFile(file: File, signal?: AbortSignal) {
  if (file.size > 10 * 1024 * 1024)
    throw new Error('Choose a file smaller than 10 MB.');
  const body = new FormData();
  body.append('file', file);
  return z
    .object({ id: z.string(), url: z.string().url() })
    .parse(
      await apiClient
        .post('uploads', { body, signal, credentials: 'include' })
        .json(),
    );
}
