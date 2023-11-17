import dayjs from "dayjs";

type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
};

const generateClassTimeFromTimeObject = (
  classTime: dayjs.Dayjs,
  classDurationMinutes: number
) => {
  const startTime = classTime;
  const endTime = classTime.add(classDurationMinutes, "minute");

  return { startTime: startTime, endTime: endTime };
};

export const generateSchedule = (
  endDate: dayjs.Dayjs,
  classTime: dayjs.Dayjs,
  classDurationMinutes: number,
  selectedDays: number[]
) => {
  const end = endDate;

  const { startTime } = generateClassTimeFromTimeObject(
    classTime,
    classDurationMinutes
  );

  const schedule: Schedule[] = [];
  let currentSessionDate = startTime;

  while (currentSessionDate.isBefore(end) || currentSessionDate.isSame(end)) {
    const classStartTime = currentSessionDate;
    const classEndTime = classStartTime.add(classDurationMinutes, "minute");

    if (classEndTime.isBefore(end) || classEndTime.isSame(end)) {
      // Only add the session if it ends before or on the end date and on selected days
      if (selectedDays.includes(classStartTime.day())) {
        schedule.push({
          id: String(Math.floor(Math.random() * 100000)),
          title: "Class A",
          start: classStartTime.toISOString(),
          end: classEndTime.toISOString(),
        });
      }
    }

    // Move to the next session based on the selected days
    let daysToAdd = 1; // Default: daily
    if (
      selectedDays.includes(1) ||
      selectedDays.includes(3) ||
      selectedDays.includes(5)
    ) {
      // If Monday, Wednesday, or Friday is selected
      daysToAdd = 2;
    }

    currentSessionDate = currentSessionDate.add(daysToAdd, "day");
  }

  return { sessions: schedule.length, schedule };
};
