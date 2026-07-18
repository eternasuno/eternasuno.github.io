export default ({ date, class: className }: { date: Date; class?: string }) => (
  <time class={className} dateTime={date.toISOString()}>
    {formatDate(date)}
  </time>
);

const formatDate =
  new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'Asia/Tokyo' }).format;
