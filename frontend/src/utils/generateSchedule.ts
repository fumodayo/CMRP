import dayjs from "dayjs";

type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export const generateSchedule = (
  name: string,
  startDate?: dayjs.Dayjs,
  endDate?: dayjs.Dayjs,
  classDurationMinutes?: number,
  selectedDays?: { day: number; time: string }[]
) => {
  const schedule: Schedule[] = [];
  const selectedDaysOfWeek = selectedDays?.map((item) => item.day) || [];

  let currentDate = startDate?.startOf("day");

  if (!currentDate || !endDate || !classDurationMinutes || !selectedDays) {
    return { schedule: [] };
  }

  // Iterate from start date to end date
  while (
    currentDate.isSame(endDate, "day") ||
    currentDate.isBefore(endDate, "day")
  ) {
    const dayOfWeek = currentDate.day();

    if (
      dayOfWeek !== undefined &&
      selectedDaysOfWeek.includes(dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    ) {
      const selectedDay = selectedDays.find(
        (day) => day.day === (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
      );

      if (selectedDay && selectedDay.time) {
        const timeParts = selectedDay.time.split("T")[1].split(":");
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);

        const classStartTime = currentDate
          .set("hour", hours)
          .set("minute", minutes);
        const classEndTime = classStartTime.add(classDurationMinutes, "minute");

        if (classEndTime.isBefore(currentDate.endOf("day"))) {
          schedule.push({
            id: String(Math.floor(Math.random() * 100000)),
            title: name,
            start: classStartTime.toISOString(),
            end: classEndTime.toISOString(),
          });
        }
      }
    }

    // Move to the next day
    currentDate = currentDate.add(1, "day");
  }

  return { schedule };
};
