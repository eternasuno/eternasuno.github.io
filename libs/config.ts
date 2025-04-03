import { join } from 'path';
import { cwd, env } from 'process';

export const AUTHOR = 'eternasuno';

export const DOMAIN = env.DOMAIN || 'http://localhost:3000';

export const POST_PATH = join(cwd(), 'posts');

export const SHOW_DRAFT = env.NODE_ENV === 'development';
