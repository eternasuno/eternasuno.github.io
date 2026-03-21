export default ({ title, metas }: Lume.Data) => (
  <div tw='flex h-full w-full items-center justify-center font-bold bg-white tracking-tight'>
    <div tw='absolute left-10 top-10 flex items-center'>
      <span tw='w-6 h-6 bg-black' />
      <span tw='ml-2 text-2xl'>
        {metas?.site}
      </span>
    </div>
    <div tw='flex flex-wrap items-center justify-center px-12 py-6 mx-10 text-4xl text-center bg-black text-white leading-snug w-auto max-w-[550px]'>
      {title}
    </div>
  </div>
);
