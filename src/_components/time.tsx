export default ({ date, class: className }: { date: Date; class?: string }) => (
  <time class={className} dateTime={date.toISOString()}>
    {formatDate(date)}
  </time>
);

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};
