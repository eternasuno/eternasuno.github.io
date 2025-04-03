import type { ComponentProps } from 'react';

import { format as formatDate, formatISO } from 'date-fns';

type Props = Omit<ComponentProps<'time'>, 'dateTime'> & {
  date: Date;
  format?: string;
};

const Time = ({ date, format = 'LLLL d, yyyy', ...rest }: Props) => (
  <time {...rest} dateTime={formatISO(date)}>
    {formatDate(date, format)}
  </time>
);

export default Time;
