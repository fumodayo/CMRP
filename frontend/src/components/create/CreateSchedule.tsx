import { useCallback, useState } from "react";
import Booking from "../inputs/Booking";

const CreateSchedule = ({ nameCourse }) => {
  const [bookingData, setBookingData] = useState({
    lesson: 0,
    schedule: [],
    startDate: null,
    endDate: null,
  });

  console.log(bookingData);

  const handleBooking = useCallback(
    (lesson: number, schedule: any, startDate: any, endDate: any) => {
      setBookingData({ lesson, schedule, startDate, endDate });
    },
    []
  );

  return <Booking nameCourse={nameCourse} onChangeBooking={handleBooking} />;
};

export default CreateSchedule;
