import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

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
  },
  {
    title: "Số tiền",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Khóa học",
    dataIndex: "name",
    key: "name",
  },
];

const History = () => {
  const items = [
    {
      createdAt: "08-10-2023",
      price: 1000000,
      name: "Full Stack Developer",
    },
    {
      createdAt: "09-10-2023",
      price: 49000,
      name: "Nhạc lý cơ bản",
    },
  ];

  return <Table columns={columns} dataSource={items} />;
};

export default History;
