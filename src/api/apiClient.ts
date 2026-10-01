import ky from 'ky';
import { mainConfig } from './config';

export const apiClient = ky.create({
  prefix: mainConfig.API_BASE_URL,
  retry: 0,
  timeout: 15_000,
});
