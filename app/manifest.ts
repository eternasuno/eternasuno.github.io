import { DESCRIPTION, TITLE } from '@/libs/config';
import type { MetadataRoute } from 'next';

const Manifest = () =>
  ({
    background_color: 'oklch(28.8229% 0.022103 277.508664/1)',
    description: DESCRIPTION,
    display: 'fullscreen',
    icons: [
      {
        purpose: 'any',
        sizes: '192x192',
        src: '/icon/192',
        type: 'image/png',
      },
      {
        purpose: 'any',
        sizes: '384x384',
        src: '/icon/384',
        type: 'image/png',
      },
      {
        purpose: 'any',
        sizes: '512x512',
        src: '/icon/512',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '1024x1024',
        src: '/icon/1024',
        type: 'image/png',
      },
    ],
    id: TITLE,
    name: TITLE,
    orientation: 'any',
    prefer_related_applications: false,
    scope: '/',
    short_name: TITLE,
    start_url: '/',
    theme_color: 'oklch(28.8229% 0.022103 277.508664/1)',
  }) as MetadataRoute.Manifest;

export default Manifest;
