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
    dataIndex: "course_name",
    key: "course_name",
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
