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

const ReviewHistory = () => {
  const items = [
    {
      _id: "0222",
      createdAt: "09-10-2023",
      name: "Khóa học Code",
      rating: 5,
      content: "Hay",
    },
    {
      _id: "0222",
      createdAt: "09-10-2023",
      name: "Khóa học Code",
      rating: 5,
      content: "Hay",
    },
  ];

  return <Table columns={columns} dataSource={items} />;
};

export default ReviewHistory;
