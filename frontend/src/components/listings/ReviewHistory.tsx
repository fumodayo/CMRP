import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  _id: string;
  createdAt: string;
  name: string;
  rating: number;
  content: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Thời gian",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Khóa học",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Đánh giá",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
  },
];

const ReviewHistory = ({ reviews }) => {
  return <Table columns={columns} dataSource={reviews} />;
};

export default ReviewHistory;
