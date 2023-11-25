import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { viVN } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { generateSchedule } from "../../utils/generateSchedule";
import {
  MobileTimePicker,
  StaticDateRangePicker,
} from "@mui/x-date-pickers-pro";
import { DateRange } from "@mui/x-date-pickers-pro";
import MultiSelect from "./MultiSelect";
import { nanoid } from "nanoid";

type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
};

const Booking = ({ onChangeBooking }) => {
  const today = dayjs();

  // Schedule lấy từ database
  const [events, setEvents] = useState<Schedule[]>([]);

  // Range time (startDate, endDate)
  const [selectedRangeTime, setSelectedRangeTime] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);

  const handleRangeTimeChange = (newRange: any) => {
    setSelectedRangeTime(newRange);
  };

  // Lịch trình theo thứ
  const [multiDays, setMultiDays] = useState<{ day: number; time: string }[]>(
    []
  );

  const handleMultiDaysChange = (selectedDays: string[]) => {
    const updatedSchedule = selectedDays.map((day) => {
      const found = multiDays.find((item) => item.day === parseInt(day));
      return found ? found : { day: parseInt(day), time: "" };
    });
    setMultiDays(updatedSchedule);
  };

  const handleTimeChange = (selectedTime: string, dayIndex: number) => {
    const updatedSchedule = multiDays.map((item, index) =>
      index === dayIndex ? { ...item, time: selectedTime } : item
    );
    setMultiDays(updatedSchedule);
  };

  // Handle trong lịch
  const handleEventClick = (clickInfo: EventClickArg) => {
    const clickedEvent = clickInfo.event;
    const eventId = clickedEvent.id;

    // Kiểm tra xem sự kiện được click có trong danh sách events không
    const eventIndex = events.findIndex((event) => event.id === eventId);

    // Nếu sự kiện được click có trong danh sách events, xóa nó
    if (eventIndex !== -1) {
      const updatedEvents = [...events];
      updatedEvents.splice(eventIndex, 1);
      setEvents(updatedEvents);
    }
  };

  const handleEmptySlotClick = (arg: any) => {
    console.log(arg);
    const clickedDate = arg.dateStr;

    // Kiểm tra xem clickedDate đã có trong danh sách events chưa
    const isDateOccupied = events.some((event) =>
      dayjs(event.start).isSame(clickedDate, "day")
    );

    // Nếu clickedDate chưa có sự kiện, thêm sự kiện mới
    if (!isDateOccupied) {
      const newEvent = {
        id: nanoid(),
        title: "Sự kiện mới",
        start: clickedDate,
        end: clickedDate, // hoặc cập nhật end date nếu cần
      };

      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
    }

    // Các hành động khác (nếu cần)
    // ...
  };

  const [isResetMultiSelect, setResetMultiSelect] = useState(false);

  const handleReset = () => {
    setSelectedRangeTime([null, null]);
    setMultiDays([]);
    setResetMultiSelect(true);
  };

  useEffect(() => {
    const [startDate, endDate] = selectedRangeTime;

    const classDurationMinutes = 90;

    const { lesson, schedule } = generateSchedule(
      startDate || dayjs(),
      endDate || dayjs().add(1, "year"),
      classDurationMinutes,
      multiDays
    );

    onChangeBooking(lesson, schedule, startDate?.format(), endDate?.format());

    setEvents(schedule);
    setResetMultiSelect(false);
  }, [selectedRangeTime, onChangeBooking, multiDays]);

  return (
    <div>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateLibInstance={dayjs}
        adapterLocale={"vi"}
        localeText={
          viVN.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <div className="flex">
          <StaticDateRangePicker
            slotProps={{
              actionBar: { actions: [] },
            }}
            calendars={2}
            value={selectedRangeTime}
            onChange={handleRangeTimeChange}
            minDate={today}
          />
          <MultiSelect
            array={[
              { label: "Thứ 2", value: 0 },
              { label: "Thứ 3", value: 1 },
              { label: "Thứ 4", value: 2 },
              { label: "Thứ 5", value: 3 },
              { label: "Thứ 6", value: 4 },
              { label: "Thứ 7", value: 5 },
              { label: "Chủ nhật", value: 6 },
            ]}
            name="Chọn ngày theo lịch trình của bạn"
            onMultiSelectChange={handleMultiDaysChange}
            reset={isResetMultiSelect}
          />
          <div className="flex flex-col">
            {multiDays
              .sort((a, b) => a.day - b.day)
              .map((item, index) => (
                <div key={index}>
                  <p>{item.day === 6 ? "Chủ nhật" : `Thứ ${item.day + 2}`}</p>
                  <MobileTimePicker
                    ampm={false}
                    label="Giờ bắt đầu buổi học"
                    value={dayjs(item.time)}
                    onChange={(time) => handleTimeChange(time.format(), index)}
                  />
                </div>
              ))}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Reset
        </button>
      </LocalizationProvider>
      <FullCalendar
        validRange={{
          start: today.toISOString(), // Ngày hôm nay
          end: today.add(1, "year").toISOString(), // Ngày kết thúc trong 1 năm từ ngày hôm nay
        }}
        height={700}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleEmptySlotClick}
        events={events}
        locale={"vi"}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Booking;
