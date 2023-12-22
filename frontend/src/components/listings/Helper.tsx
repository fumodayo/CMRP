import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatDate } from "../../utils/formatDate";
import moment from "moment";

interface DataType {
  _id: string;
  createdAt: string;
  status: string;
  content: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Ticket",
    dataIndex: "_id",
    key: "_id",
  },
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
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
  },
];

const Helper = () => {
  const items = [
    {
      _id: "0122",
      createdAt: "09-10-2023",
      status: "Đang xử lý",
      content: "Hủy đăng ký khóa học",
    },
    {
      _id: "0122",
      createdAt: "09-10-2023",
      status: "Đang xử lý",
      content: "Nội dung không giống như quảng cáo",
    },
  ];

  return <Table columns={columns} dataSource={items} />;
};

export default Helper;
