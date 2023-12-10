import Container from "../../components/Container";
import InstructorLayout from "../../layouts/InstructorLayout";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../context/Store";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import { Modal, Table, Tag } from "antd";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";

interface DataType {
  key: string;
  name: string;
  type: string;
  total_student: number;
  category: string[];
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên khóa học",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Loại",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Tổng số học viên tối thiểu",
    dataIndex: "total_student",
    key: "total_student",
  },
  {
    title: "Thể loại",
    key: "category",
    dataIndex: "category",
    render: (_, { category }) => (
      <>
        {category.map((tag) => {
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
    render: (status) => {
      let color = "";
      let text = "";

      switch (status) {
        case "COMPLETED":
          color = "volcano";
          text = "THÀNH CÔNG";
          break;
        case "OPEN":
          color = "green";
          text = "MỞ";
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

  const income = 1000000;
  const pending_money = 5000000;

  const handleConfirm = () => {
    toast.success("Đã chuyển tiền");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    toast.error("Chuyển tiền thất bại");
    setIsModalOpen(false);
  };

  return (
    <InstructorLayout>
      <Container>
        <section className="space-y-5">
          <div className="flex space-x-5">
            <div className="bg-slate-200 rounded-2xl px-5 py-2 flex flex-col justify-center">
              <p className="font-medium text-2xl">Doanh thu tháng này</p>
              <p className="font-medium text-2xl">
                {formatPrice(income)}
                <span className="text-emerald-500 ml-1">đ</span>
              </p>
            </div>
            <div className="bg-slate-200 rounded-2xl px-5 py-2 flex flex-col justify-center">
              <p className="font-medium text-2xl">Số tiền có thể rút</p>
              <p className="font-medium text-2xl">
                {formatPrice(pending_money)}
                <span className="text-emerald-500 ml-1">đ</span>
              </p>
              <p
                onClick={() => setIsModalOpen(true)}
                className="font-medium hover:underline cursor-pointer text-sm text-red-500"
              >
                Rút tiền
              </p>
            </div>
          </div>
          <h1 className="font-medium text-2xl">Khóa học</h1>
          <Table columns={columns} dataSource={courseData} />
        </section>
        <Modal
          title="Xác nhận rút tiền"
          okText="Xác nhận"
          cancelText="Hủy"
          open={isModalOpen}
          onOk={handleConfirm}
          onCancel={handleCancel}
          okType="danger"
        >
          Có phải bạn muốn rút {formatPrice(pending_money)}đ
        </Modal>
      </Container>
    </InstructorLayout>
  );
};

export default Dashboard;
