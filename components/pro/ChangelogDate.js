import { format, parseISO } from 'date-fns'

export default function ChangelogDate({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'PP')}</time>
}
