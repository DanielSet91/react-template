import { HTTPError, TimeoutError } from 'ky';
import { ZodError } from 'zod';

export function errorMessage(error: unknown): string {
  if (error instanceof ZodError)
    return 'The server returned an unexpected response. Please try again.';
  if (error instanceof HTTPError) {
    if (error.response.status === 401) return 'Please sign in to continue.';
    if (error.response.status === 403)
      return 'You do not have permission to do this.';
    if (error.response.status === 404)
      return 'The requested item was not found.';
    return `Request failed (${error.response.status}). Please try again.`;
  }
  if (error instanceof TimeoutError)
    return 'The request timed out. Please try again.';
  if (error instanceof TypeError)
    return 'Could not connect. Check your connection and try again.';
  return error instanceof Error
    ? error.message
    : 'Something went wrong. Please try again.';
}
