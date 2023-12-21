import { Button, Modal } from "antd";
import Booking from "./inputs/Booking";
import { useCallback, useState } from "react";

interface EditScheduleModalProps {
  course_id: string;
  visible: boolean;
  onClose: () => void;
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
  course_id,
  visible,
  onClose,
}) => {
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

  const handleSubmit = () => {
    console.log("bookingData", bookingData);
  };

  return (
    <Modal
      className="w-full min-w-[70vw] max-w-4xl"
      title="Chỉnh sửa lịch dạy"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Booking
        nameCourse={"test"}
        onChangeBooking={handleBooking}
        startDate=""
        endDate=""
      />
      <Button onClick={handleSubmit}>Lưu</Button>
    </Modal>
  );
};

export default EditScheduleModal;
