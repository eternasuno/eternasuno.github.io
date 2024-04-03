import { join } from 'path';
import metadata from '@/contents/metadata.json';
import { env } from 'process';

export const DEV = env.NODE_ENV === 'development';

export const TITLE = metadata.title;

export const CREATOR = metadata.creator;

export const DESCRIPTION = metadata.description;

export const BASE_URL = DEV
  ? `http://localhost:${env.PORT || 3000}`
  : `https://${metadata.host}`;

export const POST_DIR = join(process.cwd(), 'contents', 'posts');
