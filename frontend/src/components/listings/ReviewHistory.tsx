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
  const reviews = [
    {
      _id: "review_1",
      createdAt: "10-02-2023",
      name: "Đánh Thức Năng Lực Giao Tiếp Trong Bạn",
      rating: 3.4,
      content: "Không hay",
    },
    {
      _id: "review_2",
      createdAt: "15-02-2023",
      name: "Chỉnh sửa ảnh, cắt ghép ảnh với Photoshop",
      rating: 4.3,
      content: "Cũng ổn",
    },
  ];
  return <Table columns={columns} dataSource={reviews} />;
};

export default ReviewHistory;
