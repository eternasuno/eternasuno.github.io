import { CREATOR } from '@/libs/config';
import { ImageResponse } from 'next/og';

const imageMetadatas = [
  {
    id: '192',
    size: { height: 192, width: 192 },
  },
  {
    id: '384',
    size: { height: 384, width: 384 },
  },
  {
    id: '512',
    size: { height: 512, width: 512 },
  },
  {
    id: '1024',
    size: { height: 1024, width: 1024 },
  },
];

const Icon = ({ id }: { id: string }) => {
  const { size } = imageMetadatas.find((data) => data.id === id) ?? imageMetadatas[0];

  return new ImageResponse(
    <div tw="flex h-full w-full items-center justify-center rounded-lg bg-black text-[60vw] text-white uppercase">
      {CREATOR[0]}
    </div>,
    { ...size },
  );
};

export const generateImageMetadata = () => imageMetadatas;

export default Icon;
