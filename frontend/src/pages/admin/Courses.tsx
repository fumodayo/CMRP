import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Container from "../../components/Container";
import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Course, FeedBack } from "../../types";
import moment from "moment";
import { formatDate } from "../../utils/formatDate";
import FeedbackModal from "../../components/FeedbackModal";
import axios from "axios";
import CourseModal from "../../components/CourseModal";

const uniqueTypes = (data: Course[], kind: string) => {
  return Array.from(new Set(data.map((item) => item[kind]))).map((type) => ({
    text: type,
    value: type,
  }));
};

const Courses = () => {
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/admin/courses",
        {
          withCredentials: true,
        }
      );
      setData(data);
    };
    fetchData();
  }, []);

  const [filterByAuthor, setFilterByAuthor] = useState<any[]>([]);
  const [filterByCategory, setFilterByCategory] = useState<any[]>([]);

  useEffect(() => {
    const author = uniqueTypes(data, "author");

    const fetchCategories = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/category`);
      const categories = data.map((item) => ({
        text: item.name,
        value: item.value,
      }));
      setFilterByCategory(categories);
    };

    fetchCategories();

    setFilterByAuthor(author);
  }, [data]);

  const [isOpenFeedbackModal, setIsOpenFeedbackModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedBack[]>([]);
  const [isOpenCourseModal, setIsOpenCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const handleSelectedFeedback = (feedbacks) => {
    setSelectedFeedback(feedbacks);
    setIsOpenFeedbackModal(true);
  };

  const handleSelectedCourse = (course_id) => {
    setSelectedCourse(course_id);
    setIsOpenCourseModal(true);
  };

  const handleConfirm = async (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "PUBLIC" };
      }
      return item;
    });
    setData(updatedData);
    const body = { status: "PUBLIC" };
    await axios.put(`http://localhost:8080/api/admin/course/${id}`, body, {
      withCredentials: true,
    });
    toast.success("Mở khóa học thành công");
  };

  const handleReject = async (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "REJECTED" };
      }
      return item;
    });
    setData(updatedData);
    const body = { status: "REJECTED" };
    await axios.put(`http://localhost:8080/api/admin/course/${id}`, body, {
      withCredentials: true,
    });
    toast.success("Đóng khóa học thành công");
  };

  const handleClose = async (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "REJECTED" };
      }
      return item;
    });
    setData(updatedData);
    const body = { status: "REJECTED" };
    await axios.put(`http://localhost:8080/api/admin/course/${id}`, body, {
      withCredentials: true,
    });
    toast.success("Khóa khóa học thành công");
  };

  const columns: ColumnsType<Course> = [
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return formatDate(createdAt);
      },
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      defaultSortOrder: "descend",
    },
    {
      title: "Người tạo khóa học",
      dataIndex: "author",
      key: "author",
      filters: filterByAuthor,
      onFilter: (value: any, record: Course) =>
        record.author?.indexOf(value) === 0,
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
      render: (name, record) => {
        return (
          <div
            onClick={() => handleSelectedCourse(record._id)}
            className="hover:font-medium hover:underline cursor-pointer"
          >
            {name}
          </div>
        );
      },
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "Online",
          value: "online",
        },
        {
          text: "Offline",
          value: "offline",
        },
        {
          text: "Hybrid",
          value: "Hybrid",
        },
      ],
      onFilter: (value: any, record: Course) =>
        record.type?.indexOf(value) === 0,
    },
    {
      title: "Tổng số học viên đã đăng ký",
      dataIndex: "total_enroll",
      key: "total_enroll",
      sorter: (a, b) => a.total_enroll - b.total_enroll,
    },
    {
      title: "Tổng số học viên tối thiểu",
      dataIndex: "total_student",
      key: "total_student",
      sorter: (a, b) => a.total_student - b.total_student,
    },
    {
      title: "Thể loại",
      key: "category",
      dataIndex: "category",
      filters: filterByCategory,
      onFilter: (value: any, record: Course) => {
        const selectedCategories = Array.isArray(value) ? value : [value];
        return (
          selectedCategories.every((selectedCategory) =>
            record.category.includes(selectedCategory)
          ) &&
          selectedCategories.some((selectedCategory) =>
            record.category.includes(selectedCategory)
          )
        );
      },
      render: (_, { category }) => (
        <>
          {category &&
            category.map((tag) => {
              return (
                <Tag color="blue" key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Thành công",
          value: "COMPLETED",
        },
        {
          text: "Mở",
          value: "PUBLIC",
        },
        {
          text: "Bị ẩn",
          value: "NONPUBLIC",
        },
        {
          text: "Trong quá trình dạy",
          value: "IN_PROGRESS",
        },
        {
          text: "Đang chờ thanh toán tiền",
          value: "AWAITING",
        },
        {
          text: "Thất bại",
          value: "REJECTED",
        },
        {
          text: "Chờ được duyệt",
          value: "PENDING",
        },
      ],
      onFilter: (value: any, record: Course) => record.status === value,
      render: (status) => {
        let color = "";
        let text = "";

        switch (status) {
          case "COMPLETED":
            color = "green";
            text = "THÀNH CÔNG";
            break;
          case "PUBLIC":
            color = "green";
            text = "MỞ";
            break;
          case "NONPUBLIC":
            color = "green";
            text = "BỊ ẨN";
            break;
          case "IN_PROGRESS":
            color = "red";
            text = "TRONG QUÁ TRÌNH";
            break;
          case "AWAITING":
            color = "pink";
            text = "ĐANG CHỜ THANH TOÁN TIỀN";
            break;
          case "REJECTED":
            color = "lime";
            text = "THẤT BẠI";
            break;
          case "PENDING":
            color = "geekblue";
            text = "ĐANG CHỜ XỬ LÝ";
            break;
          default:
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "actions",
      render: (_id, record: Course) => {
        if (record.status === "PENDING") {
          return (
            <Space>
              <Button type="primary" ghost onClick={() => handleConfirm(_id)}>
                Mở
              </Button>
              <Button type="primary" danger onClick={() => handleReject(_id)}>
                Đóng
              </Button>
            </Space>
          );
        } else if (record.status === "IN_PROGRESS") {
          return (
            <Space>
              <Button type="primary" danger onClick={() => handleClose(_id)}>
                Khóa khóa học
              </Button>
            </Space>
          );
        }
        return null;
      },
    },
    {
      title: "Báo cáo mới",
      key: "feedbacks",
      dataIndex: "feedbacks",
      sorter: (a, b) => a.feedbacks.length - b.feedbacks.length,
      render: (_, record) => {
        const pendingFeedbacks = record.feedbacks.filter(
          (feedback) => feedback.status === "PENDING"
        );

        return pendingFeedbacks.length > 0 ? (
          <div className="flex items-end text-xl text-red-500 font-bold">
            {pendingFeedbacks.length}
          </div>
        ) : (
          <div>_</div>
        );
      },
    },
    {
      title: "Báo cáo",
      key: "feedbacks",
      dataIndex: "feedbacks",
      sorter: (a, b) => a.feedbacks.length - b.feedbacks.length,
      render: (_, record: Course) => {
        return record.feedbacks.length > 0 ? (
          <div className="flex items-end text-xl text-red-500 font-bold">
            {record.feedbacks.length}
            <p
              onClick={() => handleSelectedFeedback(record.feedbacks)}
              className="ml-1 font-medium text-sm hover:font-bold hover:underline cursor-pointer mb-1"
            >
              Hiện thị
            </p>
          </div>
        ) : (
          <div>_</div>
        );
      },
    },
  ];

  return (
    <AdminLayout>
      <section className="space-y-5">
        <FeedbackModal
          feedbacks={selectedFeedback}
          visible={isOpenFeedbackModal}
          onClose={() => setIsOpenFeedbackModal(false)}
        />
        <CourseModal
          course_id={selectedCourse}
          visible={isOpenCourseModal}
          onClose={() => setIsOpenCourseModal(false)}
        />
        <h1 className="font-medium text-2xl">Khóa học</h1>
        <Table className="min-w-full" columns={columns} dataSource={data} />
      </section>
    </AdminLayout>
  );
};

export default Courses;
