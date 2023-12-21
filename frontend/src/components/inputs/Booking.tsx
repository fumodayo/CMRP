import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg, EventDropArg } from "@fullcalendar/core";
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
import Modal from "../Modal";
import moment from "moment";
import toast from "react-hot-toast";

type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
};

interface ScheduleState {
  clickInfo?: EventClickArg;
  selectInfo?: DateSelectArg;
  checkInfo?: EventDropArg | EventResizeDoneArg;
  status?: string;
}

interface BookingProps {
  nameCourse: string;
  onChangeBooking: any;
}

const Booking: React.FC<BookingProps> = ({ nameCourse, onChangeBooking }) => {
  const today = dayjs();
  const [state, setState] = useState<ScheduleState>({});
  const calendarRef = useRef(null);

  const [modal, setModal] = useState(false);
  const [childrenSetup, setChildrenSetup] = useState<JSX.Element>();
  const [addNewTime, setAddNewTime] = useState("");
  const [addNewEvent, setAddNewEvent] = useState("");

  const handleCloseModal = () => {
    handleClose();
    setModal(false);
  };

  const handleClose = () => {
    setState({});
    setModal(false);
  };

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

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (selectedRangeTime[0] && selectedRangeTime[1]) {
      if (clickInfo) {
        setState({ clickInfo, status: "UPDATE" });
        setModal(true);
        const date = clickInfo.event.start.toISOString();
        setAddNewEvent(date);
      }
    } else {
      toast.error("Vui lòng chọn ngày bắt đầu, ngày kết thúc trước!");
    }
  };

  const handleEmptySlotClick = (clickInfo: any) => {
    if (selectedRangeTime[0] && selectedRangeTime[1]) {
      setAddNewEvent(clickInfo.startStr);
      setModal(true);
      const newChildren = (
        <div>
          <h2>Giờ bắt đầu buổi học</h2>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateLibInstance={dayjs}
            adapterLocale={"vi"}
            localeText={
              viVN.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <MobileTimePicker
              ampm={false}
              onChange={(time) => setAddNewTime(time)}
            />
          </LocalizationProvider>
        </div>
      );
      setChildrenSetup(newChildren);
    } else {
      toast.error("Vui lòng chọn ngày bắt đầu, ngày kết thúc trước!");
    }
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

    const { schedule } = generateSchedule(
      nameCourse,
      startDate || dayjs(),
      endDate || dayjs().add(1, "year"),
      classDurationMinutes,
      multiDays
    );

    setEvents(schedule);
    setResetMultiSelect(false);
  }, [selectedRangeTime, onChangeBooking, multiDays, nameCourse]);

  useEffect(() => {
    onChangeBooking({
      schedule: events,
      startDate: selectedRangeTime[0]?.format(),
      endDate: selectedRangeTime[1]?.format(),
    });
  }, [events, selectedRangeTime]);

  const handleSubmit = () => {
    const startDateTime = moment(addNewTime["$d"]);
    const newStart = startDateTime
      .set({
        year: parseInt(addNewEvent.substring(0, 4)),
        month: parseInt(addNewEvent.substring(5, 7)) - 1, // Giảm đi 1 vì tháng bắt đầu từ 0
        date: parseInt(addNewEvent.substring(8, 10)),
      })
      .toISOString();

    const endDateTime = new Date(addNewTime["$d"]);
    const newEnd = new Date(endDateTime.getTime() + 90 * 60000).toISOString();

    const newEvent: Schedule = {
      id: nanoid(),
      title: `${nameCourse} Created`,
      start: newStart,
      end: newEnd,
    };
    setEvents((oldEvents) => [...oldEvents, newEvent]);
    handleClose();
  };

  const handleDelete = () => {
    if (state.clickInfo) {
      const updatedEvents = events.filter(
        (item) => item.id !== state?.clickInfo?.event.id
      );
      setEvents(updatedEvents);
      handleClose();
    }
  };

  const handleEdit = () => {
    const startDateTime = moment(addNewTime["$d"]);
    const newStart = startDateTime
      .set({
        year: parseInt(addNewEvent.substring(0, 4)),
        month: parseInt(addNewEvent.substring(5, 7)) - 1, // Giảm đi 1 vì tháng bắt đầu từ 0
        date: parseInt(addNewEvent.substring(8, 10)),
      })
      .toISOString();

    const endDateTime = new Date(addNewTime["$d"]);
    const newEnd = new Date(endDateTime.getTime() + 90 * 60000).toISOString();

    if (state.clickInfo) {
      const updatedEvents = events.map((item) => {
        if (item.id === state?.clickInfo?.event.id) {
          return {
            ...item,
            title: `${nameCourse} Updated`,
            start: newStart,
            end: newEnd,
          };
        }
        return item;
      });

      setEvents(updatedEvents);
      handleClose();
    }
  };

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
            // minDate={today}
          />
          <MultiSelect
            array={[
              { name: "Thứ 2", value: 0 },
              { name: "Thứ 3", value: 1 },
              { name: "Thứ 4", value: 2 },
              { name: "Thứ 5", value: 3 },
              { name: "Thứ 6", value: 4 },
              { name: "Thứ 7", value: 5 },
              { name: "Chủ nhật", value: 6 },
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
        ref={calendarRef}
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
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleEmptySlotClick}
        events={events}
        locale={"vi"}
        eventClick={handleEventClick}
      />
      <Modal
        title={
          state.status === "UPDATE" ? "Chỉnh sửa buổi học" : "Thêm buổi học mới"
        }
        isOpen={modal}
        toggle={handleCloseModal}
        onCancel={handleCloseModal}
        onSubmit={state.clickInfo ? handleEdit : handleSubmit}
        submitText={state.clickInfo ? "Thay đổi" : "Lưu"}
        onDelete={state.clickInfo && handleDelete}
        deleteText={"Xóa"}
      >
        {childrenSetup}
      </Modal>
    </div>
  );
};

export default Booking;
