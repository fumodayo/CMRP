import { DateTime } from "luxon";

interface Event {
  id?: string;
  title?: string;
  start?: string;
  end?: string;
}

function getVietnameseWeekday(weekday: number): string {
  const daysMap: { [key: number]: string } = {
    7: "Chủ Nhật",
    1: "Thứ 2",
    2: "Thứ 3",
    3: "Thứ 4",
    4: "Thứ 5",
    5: "Thứ 6",
    6: "Thứ 7",
  };

  return daysMap[weekday];
}

function getUniqueDays(eventGroup: Event[]): string {
  const daysList = [
    ...new Set(
      eventGroup.map((event) =>
        getVietnameseWeekday(
          DateTime.fromISO(event.start || "").setZone("Asia/Ho_Chi_Minh")
            .weekday
        )
      )
    ),
  ]
    .sort()
    .join(", ");

  return daysList;
}

function getTimeRange(eventGroup: Event[]): string {
  const startTimes = eventGroup.map((event) =>
    DateTime.fromISO(event.start || "")
      .setZone("Asia/Ho_Chi_Minh")
      .toMillis()
  );
  const endTimes = eventGroup.map((event) =>
    DateTime.fromISO(event.end || "")
      .setZone("Asia/Ho_Chi_Minh")
      .toMillis()
  );

  const startTime = DateTime.fromMillis(Math.min(...startTimes)).toFormat(
    "HH:mm"
  );
  const endTime = DateTime.fromMillis(Math.max(...endTimes)).toFormat("HH:mm");

  return `${startTime} đến ${endTime}`;
}

export const formatSchedule = (events: Event[]): string[] => {
  const groupedEvents: { [key: string]: Event[] } = {};

  if (!events || events.length === 0) {
    return [];
  }

  events.forEach((event) => {
    const key = event.title || "";
    if (!groupedEvents[key]) {
      groupedEvents[key] = [];
    }
    groupedEvents[key].push(event);
  });

  const timeStrings: string[] = [];

  for (const key in groupedEvents) {
    const eventGroup = groupedEvents[key];

    if (eventGroup.length > 1) {
      const daysList = getUniqueDays(eventGroup);
      const timeRange = getTimeRange(eventGroup);

      timeStrings.push(`${daysList} từ ${timeRange}`);
    } else {
      const firstEvent = eventGroup[0];
      const eventDate = DateTime.fromISO(firstEvent.start || "").setZone(
        "Asia/Ho_Chi_Minh"
      );

      const day = getVietnameseWeekday(eventDate.weekday);
      const startTime = eventDate.toFormat("HH:mm");
      const endTime = DateTime.fromISO(firstEvent.end || "")
        .setZone("Asia/Ho_Chi_Minh")
        .toFormat("HH:mm");
      const weekNumber = eventDate.weekNumber;

      timeStrings.push(
        `Tuần thứ ${weekNumber} ${day} từ ${startTime} đến ${endTime}`
      );
    }
  }

  return [...new Set(timeStrings)];
};
