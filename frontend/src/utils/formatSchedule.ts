interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
}

import { DateTime } from "luxon";

function getUniqueDays(eventGroup: Event[]): string {
  const daysMap: { [key: number]: string } = {
    0: "Chủ Nhật",
    1: "Thứ 2",
    2: "Thứ 3",
    3: "Thứ 4",
    4: "Thứ 5",
    5: "Thứ 6",
    6: "Thứ 7",
  };

  const uniqueDays = [
    ...new Set(
      eventGroup.map(
        (event) =>
          daysMap[
            DateTime.fromISO(event.start).setZone("Asia/Ho_Chi_Minh").weekday
          ]
      )
    ),
  ]
    .sort()
    .join(", ");

  return uniqueDays;
}

function getTimeRange(eventGroup: Event[]): string {
  const startTimes = eventGroup.map((event) =>
    DateTime.fromISO(event.start).setZone("Asia/Ho_Chi_Minh").toMillis()
  );
  const endTimes = eventGroup.map((event) =>
    DateTime.fromISO(event.end).setZone("Asia/Ho_Chi_Minh").toMillis()
  );

  const startTime = DateTime.fromMillis(Math.min(...startTimes)).toFormat(
    "HH:mm"
  );
  const endTime = DateTime.fromMillis(Math.max(...endTimes)).toFormat("HH:mm");

  return `${startTime} đến ${endTime}`;
}

export const formatSchedule = (events: Event[]) => {
  const groupedEvents: { [key: string]: Event[] } = {};

  events.forEach((event) => {
    const key = event.title;
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
      const eventDate = DateTime.fromISO(firstEvent.start).setZone(
        "Asia/Ho_Chi_Minh"
      );

      const day = eventDate.weekday === 1 ? "Thứ 2" : "Thứ 4";
      const startTime = eventDate.toFormat("HH:mm");
      const endTime = DateTime.fromISO(firstEvent.end)
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
