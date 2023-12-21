import { Modal } from "antd";
import { Course } from "../types";
import { formatSchedule } from "../utils/formatSchedule";
import YouTube from "react-youtube";
import { formatDate } from "../utils/formatDate";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import axios from "axios";

interface CourseModalProps {
  course_id: string;
  visible: boolean;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({
  course_id,
  visible,
  onClose,
}) => {
  const [course, setCourse] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/course/${course_id}`
      );
      setCourse(data);
    };
    fetchData();
  }, [course_id]);

  if (!course) {
    return null;
  }

  const {
    name,
    author,
    image,
    thumbnail,
    price,
    createdAt,
    startDate,
    endDate,
    category,
    type,
    address,
    short_description,
    description,
    requirement,
    total_rating,
    total_student,
    total_enroll,
    schedule,
    status,
  } = course;

  return (
    <Modal
      className="w-full min-w-[90vw] max-w-4xl"
      title="Thông tin chi tiết về khóa học"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <p className="text-gray-600 mb-2">Tên người dạy: {author}</p>
            <img
              src={image}
              alt={name}
              className="rounded-lg w-full h-64 object-cover mb-4"
            />
            {thumbnail && (
              <div className="relative rounded-2xl overflow-hidden h-80 mb-4">
                <YouTube
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  videoId={thumbnail.split("=").pop()}
                />
              </div>
            )}
            <p className="text-gray-600">Giá tiền: {price}</p>
          </div>
          <div className="lg:w-1/2">
            <p className="text-gray-600 mb-2">
              Thời gian tạo: {formatDate(createdAt)}
            </p>
            <p className="text-gray-600 mb-2">
              Ngày bắt đầu: {formatDate(startDate)}
            </p>
            <p className="text-gray-600 mb-2">
              Ngày kết thúc: {formatDate(endDate)}
            </p>
            <p className="text-gray-600 mb-2">
              Thể loại: {category?.join(", ")}
            </p>
            <p className="text-gray-600 mb-2">Loại hình: {type}</p>
            <p className="text-gray-600 mb-2">Địa chỉ: {address?.name}</p>
            {short_description && (
              <p className="text-gray-600 mb-2">
                Tiêu đề: {parse(short_description)}
              </p>
            )}
            {description && (
              <p className="text-gray-600 mb-2">
                Tóm tắt: {parse(description)}
              </p>
            )}
            {requirement && (
              <p className="text-gray-600 mb-2">
                Yêu cầu: {parse(requirement)}
              </p>
            )}
            <p className="text-gray-600 mb-2">Tổng số rating: {total_rating}</p>
            <p className="text-gray-600 mb-2">
              Tổng số học viên tối thiểu: {total_student}
            </p>
            <p className="text-gray-600 mb-2">
              Tổng số học viên đăng ký: {total_enroll}
            </p>
            <div>
              <h2 className="text-xl font-semibold mb-2">Lịch học:</h2>
              <ul className="list-disc list-inside">
                {schedule &&
                  formatSchedule(schedule).map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
