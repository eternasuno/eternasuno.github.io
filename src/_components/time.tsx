export default ({ date, class: className }: { date: Date; class?: string }) => (
  <time class={className} dateTime={date.toISOString()}>
    {formatDate(date)}
  </time>
);

const formatDate = (date: Date) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};
