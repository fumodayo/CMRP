import { useCallback, useState } from "react";
import Container from "../../components/Container";
import Booking from "../../components/inputs/Booking";
import InstructorLayout from "../../layouts/InstructorLayout";

const Schedule = () => {
  const [bookingData, setBookingData] = useState({
    lesson: 0,
    schedule: [],
    startDate: null,
    endDate: null,
  });

  const handleBooking = useCallback(
    (lesson: number, schedule: any, startDate: any, endDate: any) => {
      setBookingData({ lesson, schedule, startDate, endDate });
    },
    []
  );

  console.log(bookingData);

  return (
    <InstructorLayout>
      <Container>
        <section className="space-y-5">
          <h1>Lịch trình</h1>
          <Booking onChangeBooking={handleBooking} />
        </section>
      </Container>
    </InstructorLayout>
  );
};

export default Schedule;
