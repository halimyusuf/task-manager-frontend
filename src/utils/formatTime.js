export function getDate(date) {
  date = new Date(date);
  date = date.toLocaleDateString();
  return date;
}

export function daysLeft(date1, date2) {
  date1 = new Date();
  date2 = new Date(date2);
  let difference = date2.getTime() - date1.getTime();
  difference = difference < 0 ? 0 : difference;
  let result = Math.round(difference / (1000 * 3600 * 24));
  return result;
}

export function getFormDate(date) {
  date = new Date(date);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
}
