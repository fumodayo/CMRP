import dayjs from "dayjs";

export function formatDate(inputDate = ""): string {
  const formattedDate = dayjs(inputDate).format("DD/MM/YYYY");
  return formattedDate;
}
