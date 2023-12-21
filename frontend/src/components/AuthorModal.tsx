import { Modal, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import { Course } from "../types";
import { ColumnsType } from "antd/es/table";
import moment from "moment";

interface AuthorModalProps {
  user_id: string;
  visible: boolean;
  onClose: () => void;
}

const AuthorModal: React.FC<AuthorModalProps> = ({
  user_id,
  visible,
  onClose,
}) => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const id = "instructor_1";
      const { data } = await axios.get(
        `http://localhost:8080/api/admin/user/${id}`
      );
      setUser(data);
    };
    console.log(user_id);
    fetchData();
  }, [user_id]);

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

  if (!user) {
    return null;
  }

  const {
    avatar,
    bio,
    category,
    cccd_number,
    createdAt,
    dateOfBirth,
    email,
    income,
    isCertificate,
    name,
    pending_money,
    real_name,
    role,
  } = user.user;

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
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
      render: (name) => {
        return <div>{name}</div>;
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
  ];

  return (
    <Modal
      className="w-full min-w-[70vw] max-w-4xl"
      title="Thông tin chi tiết về người dạy"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <h1 className="text-2xl font-medium mb-4">{name}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img
              src={avatar}
              alt={name}
              className="rounded-lg w-full h-72 object-cover mb-4"
            />
          </div>
          <div className="lg:w-1/2">
            <p className="text-gray-600 mb-2">Tên thật: {real_name}</p>
            <p className="text-gray-600 mb-2">Giới thiệu: {bio}</p>
            <p className="text-gray-600 mb-2">
              Vai trò:
              {role?.includes("instructor") ? " Người dạy" : " Học viên"}
            </p>
            <p className="text-gray-600 mb-2">
              Chuyên ngành: {category?.join(", ")}
            </p>
            <p className="text-gray-600 mb-2">
              Tổng số tiền: {formatPrice(income)}đ
            </p>
            <p className="text-gray-600 mb-2">
              Số tiền đã kiếm được: {formatPrice(pending_money)}đ
            </p>
            <p className="text-gray-600 mb-2">
              Xác nhận: {isCertificate ? "Đã xác thực" : "Chưa xác thực"}
            </p>
            <p className="text-gray-600 mb-2">Số CCCD: {cccd_number}</p>
            <p className="text-gray-600 mb-2">
              Tạo ngày: {formatDate(createdAt)}
            </p>
            <p className="text-gray-600 mb-2">
              Ngày/tháng/năm sinh: {formatDate(dateOfBirth)}
            </p>
            <p className="text-gray-600 mb-2">Email: {email}</p>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-medium mb-2">Số khóa học đã tạo</h1>
          <Table
            className="min-w-full"
            columns={columns}
            dataSource={user.courses}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AuthorModal;
