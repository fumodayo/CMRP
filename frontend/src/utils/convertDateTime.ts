export const convertDateTime = (inputDateTime = "") => {
  const date = new Date(inputDateTime);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formattedDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year.toString()} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return formattedDate;
};
