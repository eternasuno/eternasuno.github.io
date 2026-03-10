import { join } from 'node:path';
import { cwd, env } from 'node:process';

export const AUTHOR = 'eternasuno';

export const DOMAIN = env.DOMAIN || 'http://localhost:3000';

export const POST_PATH = join(cwd(), 'posts');

export const POST_CONTENT_PATH = join(POST_PATH, 'content');

export const SHOW_DRAFT = env.NODE_ENV === 'development';
