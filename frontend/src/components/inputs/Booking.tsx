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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { generateSchedule } from "../../utils/generateSchedule";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import { DateRange } from "@mui/x-date-pickers-pro";

type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
};

const Booking = ({ onChangeBooking }) => {
  const today = dayjs();
  const [createTime, setCreateTime] = useState(dayjs(Date.now()));
  const [events, setEvents] = useState<Schedule[]>([]);

  const [selectedDays, setSelectedDays] = useState([2, 4, 6]);

  const [selectedRangeTime, setSelectedRangeTime] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);

  const handleRangeTimeChange = (newRange: any) => {
    setSelectedRangeTime(newRange);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log([clickInfo.event]);
  };

  const handleReset = () => {
    setSelectedRangeTime([null, null]);
    setCreateTime(dayjs(Date.now()));
  };

  useEffect(() => {
    const [startDate, endDate] = selectedRangeTime;

    const classDurationMinutes = 90;

    const { sessions, schedule } = generateSchedule(
      endDate,
      createTime,
      classDurationMinutes,
      selectedDays
    );

    onChangeBooking(sessions, schedule);

    setEvents(schedule);
  }, [createTime, selectedRangeTime, selectedDays, onChangeBooking]);

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
          <DateTimePicker
            minDateTime={today}
            label="Ngày giờ bắt đầu buổi học"
            value={createTime}
            onChange={(newValue) => setCreateTime(newValue)}
          />
        </div>
        <button
          onClick={handleReset}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Reset
        </button>
        <button
          onClick={() => setSelectedDays([1, 3, 5])}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Tạo lịch thứ 2/4/6
        </button>
      </LocalizationProvider>
      <FullCalendar
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
        events={events}
        locale={"vi"}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Booking;
