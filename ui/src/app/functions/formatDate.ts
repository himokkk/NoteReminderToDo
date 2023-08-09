export function formatYearMonthDayHourMinute(date: number[]) {
  const [year, month, day, hour, minute] = date;

  const formattedYear: string = `${year}`;
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
  const formattedHour: string = hour < 10 ? `0${hour}` : `${hour}`;
  const formattedMinute: string = minute < 10 ? `0${minute}` : `${minute}`;

  return `${formattedYear}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}`;
}

export function formatYearMonthDay(year: number, month: number, day: number): string {
  const formattedYear: string = `${year}`;
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

export function formatHourMinute(hour: number, minute: number): string {
  const formattedHour: string = hour < 10 ? `0${hour}` : `${hour}`;
  const formattedMinute: string = minute < 10 ? `0${minute}` : `${minute}`;
  return `${formattedHour}:${formattedMinute}`;
}
