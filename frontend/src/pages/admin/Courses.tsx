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
  const [data, setData] = useState<Course[]>([
    {
      _id: "course_1",
      name: "Khoá học kiếm tiền với Facebook adbreak",
      author: "Thao Nguyen",
      image: "https://img-c.udemycdn.com/course/750x422/2650482_dc40.jpg",
      thumbnail: "https://www.youtube.com/watch?v=SZwmUgugqhA",
      price: 789000,
      createdAt: "2023-12-20T00:00:00.000Z",
      startDate: "2023-12-28T00:00:00.000Z",
      endDate: "2024-02-22T00:00:00.000Z",
      category: ["kinh doanh", "marketing"],
      type: "hybrid",
      address: {
        name: "82 Núi Thành, Đà Nẵng",
        lat: 16.051916860603978,
        lng: 108.22024247689545,
      },
      short_description:
        "Bạn sẽ biết cách làm thế nào biến video thành tiền trên facebook",
      description:
        "<p>Ad Break là người sáng tạo video trên Facebook đủ điều kiện có thể kiếm tiền bằng cách đưa những quảng cáo ngắn vào trước hoặc trong khi phát video đủ điều kiện. Người tạo video sẽ nhận được một phần doanh thu từ quảng cáo video hiển thị cho người xem. Khán giả phải xem hết quảng cáo thì mới có thể xem tiếp video. Vì mỗi nhà quảng cáo lại nhắm mục tiêu đến một loại đối tượng riêng, nên mỗi người xem có thể nhìn thấy một quảng cáo khác nhau trong cùng một thời gian nghỉ để quảng cáo</p>\n",
      requirement: "<p>chỉ cần máy tính và điện thoại di động là được</p>",
      schedule: [
        {
          id: "58047",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-01-02T08:00:00.000Z",
          end: "2024-01-02T09:30:00.000Z",
        },
        {
          id: "19861",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-01-03T08:00:00.000Z",
          end: "2024-01-03T09:30:00.000Z",
        },
        {
          id: "32290",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-01-09T08:00:00.000Z",
          end: "2024-01-09T09:30:00.000Z",
        },
        {
          id: "99449",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-01-10T08:00:00.000Z",
          end: "2024-01-10T09:30:00.000Z",
        },
        {
          id: "30724",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-01-16T08:00:00.000Z",
          end: "2024-01-16T09:30:00.000Z",
        },
        {
          id: "26215",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-01-17T08:00:00.000Z",
          end: "2024-01-17T09:30:00.000Z",
        },
        {
          id: "7522",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-01-23T08:00:00.000Z",
          end: "2024-01-23T09:30:00.000Z",
        },
        {
          id: "21454",
          title: "Khoá học kiếm tiền với Facebook adbreak Updated",
          start: "2024-01-24T07:00:00.000Z",
          end: "2023-12-18T08:30:00.000Z",
        },
        {
          id: "31703",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-01-30T08:00:00.000Z",
          end: "2024-01-30T09:30:00.000Z",
        },
        {
          id: "3863",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-01-31T08:00:00.000Z",
          end: "2024-01-31T09:30:00.000Z",
        },
        {
          id: "84089",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-02-06T08:00:00.000Z",
          end: "2024-02-06T09:30:00.000Z",
        },
        {
          id: "49813",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-02-07T08:00:00.000Z",
          end: "2024-02-07T09:30:00.000Z",
        },
        {
          id: "97876",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-02-13T08:00:00.000Z",
          end: "2024-02-13T09:30:00.000Z",
        },
        {
          id: "26745",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-02-14T08:00:00.000Z",
          end: "2024-02-14T09:30:00.000Z",
        },
        {
          id: "34995",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-02-20T08:00:00.000Z",
          end: "2024-02-20T09:30:00.000Z",
        },
        {
          id: "63520",
          title: "Khoá học kiếm tiền với Facebook adbreak",
          start: "2024-02-21T08:00:00.000Z",
          end: "2024-02-21T09:30:00.000Z",
        },
        {
          id: "MsWtO-8XatydP8X-jy-ag",
          title: "Khoá học kiếm tiền với Facebook adbreak Created",
          start: "2024-01-19T09:00:00.000Z",
          end: "2023-12-18T10:30:00.000Z",
        },
        {
          id: "_9qA7Z0YHKOXNpQP3_VxF",
          title: "Khoá học kiếm tiền với Facebook adbreak Created",
          start: "2024-01-21T08:00:00.000Z",
          end: "2023-12-18T09:30:00.000Z",
        },
      ],
      total_rating: 0,
      total_student: 19,
      student_Ids: [
        "user_1",
        "user_2",
        "user_3",
        "user_4",
        "user_5",
        "user_6",
        "user_7",
        "user_8",
        "user_9",
        "user_10",
        "user_11",
        "user_12",
        "user_13",
        "user_14",
        "user_15",
        "user_16",
        "user_17",
        "user_18",
      ],
      total_enroll: 18,
      status: "PENDING",
      feedbacks: [
        {
          _id: "0122",
          createdAt: "09-10-2023",
          status: "PENDING",
          content: "Hủy đăng ký khóa học",
        },
        {
          _id: "0123",
          createdAt: "09-10-2023",
          status: "DONE",
          content: "Nội dung không giống như quảng cáo",
        },
      ],
    },
    {
      _id: "course_2",
      name: "course",
      author: "Thao Nguyen",
      type: "online",
      total_enroll: 7,
      total_student: 9,
      category: ["CNTT", "VN", "Tutsuc"],
      status: "PUBLIC",
      feedbacks: [
        {
          _id: "0122",
          createdAt: "09-10-2023",
          status: "PENDING",
          content: "Hủy đăng ký khóa học",
        },
        {
          _id: "0123",
          createdAt: "09-10-2023",
          status: "DONE",
          content: "Nội dung không giống như quảng cáo",
        },
      ],
      createdAt: "2024-11-26T00:00:00.000Z",
    },
    {
      _id: "course_3",
      name: "course",
      author: "Thao Nguyen",
      type: "offline",
      total_enroll: 23,
      total_student: 51,
      category: ["CNTT", "VN", "78whvc"],
      status: "NONPUBLIC",
      feedbacks: [
        {
          _id: "0122",
          createdAt: "09-10-2023",
          status: "PENDING",
          content: "Hủy đăng ký khóa học",
        },
        {
          _id: "0123",
          createdAt: "09-10-2023",
          status: "DONE",
          content: "Nội dung không giống như quảng cáo",
        },
      ],
      createdAt: "2023-01-26T00:00:00.000Z",
    },
    {
      _id: "course_4",
      name: "course",
      author: "Thao Nguyen",
      type: "online",
      total_enroll: 7,
      total_student: 9,
      category: ["CNTT", "VN", "893jhd"],
      status: "COMPLETED",
      feedbacks: [
        {
          _id: "0122",
          createdAt: "09-10-2023",
          status: "PENDING",
          content: "Hủy đăng ký khóa học",
        },
        {
          _id: "0123",
          createdAt: "09-10-2023",
          status: "DONE",
          content: "Nội dung không giống như quảng cáo",
        },
      ],
      createdAt: "2023-11-24T00:00:00.000Z",
    },
    {
      _id: "course_5",
      name: "course",
      author: "Lil Bitcoin",
      type: "offline",
      total_enroll: 53,
      total_student: 12,
      category: ["CNTT", "VN", "728hdb"],
      status: "REJECTED",
      feedbacks: [
        {
          _id: "0122",
          createdAt: "09-10-2023",
          status: "PENDING",
          content: "Hủy đăng ký khóa học",
        },
        {
          _id: "0123",
          createdAt: "09-10-2023",
          status: "DONE",
          content: "Nội dung không giống như quảng cáo",
        },
      ],
      createdAt: "2023-11-25T00:00:00.000Z",
    },
    {
      _id: "course_6",
      name: "course",
      author: "John Dangerous",
      type: "offline",
      total_enroll: 3,
      total_student: 19,
      category: ["CNTT"],
      status: "IN_PROGRESS",
      feedbacks: [
        {
          _id: "0122",
          createdAt: "09-10-2023",
          status: "PENDING",
          content: "Hủy đăng ký khóa học",
        },
        {
          _id: "0123",
          createdAt: "09-10-2023",
          status: "DONE",
          content: "Nội dung không giống như quảng cáo",
        },
        {
          _id: "0122",
          createdAt: "09-10-2023",
          status: "PENDING",
          content: "Hủy đăng ký khóa học",
        },
      ],
      createdAt: "2023-11-26T00:00:00.000Z",
    },
    {
      _id: "course_7",
      name: "course",
      author: "Lil Bitcoin",
      type: "hybrid",
      total_enroll: 3,
      total_student: 124,
      category: ["CNTT"],
      status: "COMPLETED",
      feedbacks: [
        {
          _id: "0122",
          createdAt: "09-10-2023",
          status: "PENDING",
          content: "Hủy đăng ký khóa học",
        },
      ],
      createdAt: "2023-11-20T00:00:00.000Z",
    },
  ]);

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

  const handleConfirm = (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "PUBLIC" };
      }
      return item;
    });
    toast.success("Mở khóa học thành công");
    setData(updatedData);
  };

  const handleReject = (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "REJECTED" };
      }
      return item;
    });
    toast.success("Đóng khóa học thành công");
    setData(updatedData);
  };

  const handleClose = (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "REJECTED" };
      }
      return item;
    });
    toast.success("Khóa khóa học thành công");
    setData(updatedData);
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
