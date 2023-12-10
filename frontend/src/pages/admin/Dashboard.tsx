import { useState } from "react";
import "lightbox.js-react/dist/index.css";
import { Tag, Table, Space, Button } from "antd";
import Container from "../../components/Container";
import AdminLayout from "../../layouts/AdminLayout";

interface DataType {
  _id: string;
  name: string;
  status: string;
  role: string[];
}

const AdminDashboard = () => {
  const [data, setData] = useState<DataType[]>([
    {
      _id: "ce_1",
      name: "Thảo Nguyễn",
      status: "ACTIVE",
      role: ["user", "instructor"],
    },
    {
      _id: "ce_2",
      name: "Hacker",
      status: "INACTIVE",
      role: ["user"],
    },
  ]);

  const handleConfirm = (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
        };
      }
      return item;
    });
    setData(updatedData);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (role) => (
        <>
          {role.map((item) => (
            <Tag color={item === "user" ? "volcano" : "green"}>
              {item.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <>
          <Tag color={status === "ACTIVE" ? "volcano" : "green"}>
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      render: (_id: string) => (
        <Space size="middle">
          <Button type="primary" ghost onClick={() => handleConfirm(_id)}>
            {data.find((item) => item._id === _id)?.status === "ACTIVE"
              ? "Khóa tài khoản"
              : "Mở khóa tài khoản"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Container>
        <h1>Quản lý người dùng</h1>
        <Table columns={columns} dataSource={data} />
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
