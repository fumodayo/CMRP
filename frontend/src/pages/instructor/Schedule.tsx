import { useState } from "react";
import Container from "../../components/Container";
import InstructorLayout from "../../layouts/InstructorLayout";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg, EventDropArg } from "@fullcalendar/core";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { viVN } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers-pro";
import { nanoid } from "nanoid";
import Modal from "../../components/Modal";
import moment from "moment";

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

const Schedule = () => {
  const today = dayjs();
  const [state, setState] = useState<ScheduleState>({});

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

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (clickInfo) {
      setState({ clickInfo, status: "UPDATE" });
      setModal(true);
      const date = clickInfo.event.start.toISOString();
      setAddNewEvent(date);
    }
  };

  const handleEmptySlotClick = (clickInfo: any) => {
    console.log("chua co event", clickInfo);
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
  };

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
      title: "Test",
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
            title: "Updated Title",
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

  console.log(events);

  return (
    <InstructorLayout>
      <Container>
        <section className="space-y-5">
          <h1 className="font-medium text-2xl">Lịch trình</h1>
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
          <Modal
            title={
              state.status === "UPDATE"
                ? "Chỉnh sửa buổi học"
                : "Thêm buổi học mới"
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
        </section>
      </Container>
    </InstructorLayout>
  );
};

export default Schedule;
