import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatDate } from "../../utils/formatDate";

interface DataType {
  createdAt: string;
  price: number;
  name: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Thời gian",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => <div>{formatDate(createdAt)}</div>,
  },
  {
    title: "Số tiền",
    dataIndex: "course_details",
    key: "course_details",
    render: (course_details) => <div>{course_details.price}</div>,
  },
  {
    title: "Khóa học",
    dataIndex: "course_details",
    key: "course_details",
    render: (course_details) => <div>{course_details.name}</div>,
  },
];

const History = ({ carts }) => {
  return <Table columns={columns} dataSource={carts} />;
};

export default History;
