import { format as formatDate, formatISO } from 'date-fns';
import type { ComponentProps } from 'react';

type Props = {
  dateTime: string;
  format?: string;
} & Omit<ComponentProps<'time'>, 'dateTime'>;

const Time = ({ dateTime, format = 'LLLL d, yyyy', ...rest }: Props) => (
  <time {...rest} dateTime={formatISO(dateTime)}>
    {formatDate(dateTime, format)}
  </time>
);

export default Time;
