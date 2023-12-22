import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Review } from "../../types";
import { formatDate } from "../../utils/formatDate";
import moment from "moment";

const columns: ColumnsType<Review> = [
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
