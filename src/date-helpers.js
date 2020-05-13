// Return month/day if time is midnight, otherwise return the time (hh:mm).
export function getMidnightDateOrTime(dateTime) {
  const date = `${dateTime.getMonth() + 1}/${dateTime.getDate()}`;
  const time = dateTime.toLocaleTimeString().split(/[:\s]/);

  return dateTime.getHours() ? `${time[0]} ${time.slice(-1)}` : date;
}