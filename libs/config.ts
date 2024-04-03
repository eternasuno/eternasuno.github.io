import { join } from 'path';
import metadata from '@/contents/metadata.json';
import { env } from 'process';

export const TITLE = metadata.title;

export const CREATOR = metadata.creator;

export const DESCRIPTION = metadata.description;

export const DEV = env.NODE_ENV === 'development';

export const HOST = DEV ? `localhost:${env.PORT || 3000}` : metadata.host;

export const BASE_URL = `${DEV ? 'http' : 'https'}://${HOST}`;

export const POST_DIR = join(process.cwd(), 'contents', 'posts');
