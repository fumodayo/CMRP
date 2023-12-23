import InstructorLayout from "../../layouts/InstructorLayout";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../context/Store";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import { Button, Modal, Space, Table, Tag } from "antd";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";
import moment from "moment";
import CourseModal from "../../components/CourseModal";
import EditCourseModal from "../../components/EditCourseModal";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store) || {};
  const { cart, userInfo } = state;
  const [courseData, setCourseData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/instructor/courses`,
        { withCredentials: true }
      );
      setCourseData(data);
    };
    fetchData();
  }, [userInfo]);

  const handleConfirm = () => {
    toast.success("Đã chuyển tiền");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    toast.error("Chuyển tiền thất bại");
    setIsModalOpen(false);
  };

  const [filterByCategory, setFilterByCategory] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/category`);
      const categories = data.map((item) => ({
        text: item.name,
        value: item.value,
      }));
      setFilterByCategory(categories);
    };

    fetchCategories();
  }, []);

  const [isOpenCourseModal, setIsOpenCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [isOpenEditCourseModal, setIsOpenEditCourseModal] = useState(false);
  const [selectedEditCourse, setSelectedEditCourse] = useState<string>("");
  // const [isOpenEditScheduleModal, setIsOpenEditScheduleModal] = useState(false);
  // const [selectedEditSchedule, setSelectedEditSchedule] = useState<string>("");

  const handleSelectedCourse = (course_id) => {
    setSelectedCourse(course_id);
    setIsOpenCourseModal(true);
  };

  const handleSelectedEditCourse = (course_id) => {
    setSelectedEditCourse(course_id);
    setIsOpenEditCourseModal(true);
  };

  // const handleSelectedEditSchedule = (course_id) => {
  //   setSelectedEditSchedule(course_id);
  //   setIsOpenEditScheduleModal(true);
  // };

  const handleNonpublicCourse = async (course_id) => {
    const body = { status: "NONPUBLIC" };
    await axios.put(
      `http://localhost:8080/api/instructor/course/${course_id}`,
      body,
      {
        withCredentials: true,
      }
    );

    // const updatedData = courseData.map((item) => {
    //   if (item._id === course_id) {
    //     return {
    //       ...item,
    //       status: "NONPUBLIC",
    //     };
    //   }
    //   return item;
    // });
    // setCourseData(updatedData);

    toast.success("Ẩn thành công");
  };

  const columns: ColumnsType<any> = [
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
      onFilter: (value: any, record) => record.type?.indexOf(value) === 0,
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
      onFilter: (value: any, record) => {
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
      onFilter: (value: any, record) => record.status === value,
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
      render: (_id, record) => {
        if (record.status === "PENDING") {
          return (
            <Space>
              <Button
                type="primary"
                ghost
                onClick={() => handleSelectedEditCourse(_id)}
              >
                Chỉnh sửa thông tin
              </Button>
              {/* <Button
                type="primary"
                ghost
                onClick={() => handleSelectedEditSchedule(_id)}
              >
                Chỉnh sửa lịch học
              </Button> */}
            </Space>
          );
        } else if (record.status === "PUBLIC") {
          return (
            <Space>
              <Button
                type="primary"
                danger
                onClick={() => handleNonpublicCourse(_id)}
              >
                Ẩn khóa học
              </Button>
            </Space>
          );
        }
        return null;
      },
    },
  ];

  return (
    <InstructorLayout>
      <Modal
        title="Xác nhận rút tiền"
        okText="Xác nhận"
        cancelText="Hủy"
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okType="danger"
      >
        Có phải bạn muốn rút {formatPrice(userInfo.pending_money)}đ
      </Modal>
      <EditCourseModal
        course_id={selectedEditCourse}
        visible={isOpenEditCourseModal}
        onClose={() => setIsOpenEditCourseModal(false)}
      />
      {/* <EditScheduleModal
        course_id={selectedEditSchedule}
        visible={isOpenEditScheduleModal}
        onClose={() => setIsOpenEditScheduleModal(false)}
      /> */}
      <CourseModal
        course_id={selectedCourse}
        visible={isOpenCourseModal}
        onClose={() => setIsOpenCourseModal(false)}
      />

      <section className="space-y-5">
        <div className="flex space-x-5">
          <div className="bg-slate-200 rounded-2xl px-5 py-2 flex flex-col justify-center">
            <p className="font-medium text-2xl">Doanh thu tháng này</p>
            <p className="font-medium text-2xl">
              {formatPrice(userInfo.income)}
              <span className="text-emerald-500 ml-1">đ</span>
            </p>
          </div>
          <div className="bg-slate-200 rounded-2xl px-5 py-2 flex flex-col justify-center">
            <p className="font-medium text-2xl">Số tiền có thể rút</p>
            <p className="font-medium text-2xl">
              {formatPrice(userInfo.pending_money)}
              <span className="text-emerald-500 ml-1">đ</span>
            </p>
            {userInfo.pending > 0 && (
              <p
                onClick={() => setIsModalOpen(true)}
                className="font-medium hover:underline cursor-pointer text-sm text-red-500"
              >
                Rút tiền
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <h1 className="font-medium text-2xl">Khóa học</h1>
          <Button>
            <Link to={"/instructor/create-course"}>Tạo khóa học mới</Link>
          </Button>
        </div>
        <Table columns={columns} dataSource={courseData} />
      </section>
    </InstructorLayout>
  );
};

export default Dashboard;
