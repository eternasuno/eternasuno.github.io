import { twc } from '@/libs/twc';

const Prose = twc.article`prose max-w-none font-mono prose-ol:ps-13 prose-pre:text-wrap prose-ul:list-["-"] [&_svg_*]:fill-none [&_svg_*]:stroke-current [&_svg_text]:fill-current [&_.contains-task-list]:list-none [&_.contains-task-list]:pl-2 dark:prose-img:brightness-75`;

export default Prose;
