export default ({ date, class: className }: { date: Date; class?: string }) => (
  <time class={className} dateTime={date.toISOString()}>
    {formatDate(date)}
  </time>
);

const formatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const formatDate = (date: Date) => {
  const parts = formatter.formatToParts(date);
  const day = parts.find((p) => p.type === 'day')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const year = parts.find((p) => p.type === 'year')?.value;

  return `${month} ${day?.padStart(2, '0')}, ${year}`;
};
