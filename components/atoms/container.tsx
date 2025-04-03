import { twc } from '@/libs/twc';

const Container = twc.div`relative mt-10 min-h-10 before:absolute before:top-0 before:-left-[100vw] before:block before:h-px before:w-[200vw] before:bg-base-200 before:select-none after:absolute after:bottom-0 after:-left-[100vw] after:block after:h-px after:w-[200vw]  after:bg-base-200 after:select-none`;

export default Container;
