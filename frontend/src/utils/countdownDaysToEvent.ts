export function countdownDaysToEvent(eventDateISO: string) {
  // Get the current date
  const currentDate = new Date();

  // Convert the event date from ISO 8601 string to a Date object
  const eventDate = new Date(eventDateISO);

  // Calculate the time difference between two dates in milliseconds
  const timeDifference = eventDate.getTime() - currentDate.getTime();

  // Calculate the remaining days
  const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Check if there are exactly 5 days remaining
  if (remainingDays < 5 && remainingDays > 0) {
    return `Còn ${remainingDays} ngày nữa bắt đầu`;
  }

  if (remainingDays < 0) {
    return null;
  }

  // If not, return the event date in 'dd/mm/yy' format
  const day = eventDate.getDate();
  const month = eventDate.getMonth() + 1; // Note that months start from 0
  const year = eventDate.getFullYear().toString().slice(-2);

  return `Hạn đăng ký: ${day}/${month}/${year}`;
}
