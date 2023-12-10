import { Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import AdminLayout from "../../layouts/AdminLayout";
import Container from "../../components/Container";
import React, { useState } from "react";

interface DataType {
  _id: string;
  createdAt: string;
  status: string;
  content: string;
}

const Support = () => {
  const [items, setItems] = useState<DataType[]>([
    {
      _id: "0122",
      createdAt: "09-10-2023",
      status: "PENDING",
      content: "Hủy đăng ký khóa học",
    },
    {
      _id: "0123",
      createdAt: "09-10-2023",
      status: "DONE",
      content: "Nội dung không giống như quảng cáo",
    },
  ]);

  const handleConfirm = (id: string) => {
    const updatedItems = items.map((item) => {
      if (item._id === id && item.status === "PENDING") {
        return {
          ...item,
          status: "DONE",
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Ticket",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <>
          <Tag color={status === "PENDING" ? "volcano" : "green"}>
            {status === "PENDING" ? "ĐANG XỬ LÝ" : "XỬ LÝ XONG"}
          </Tag>
        </>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      render: (_id: string, record: DataType) => (
        <>
          {record.status === "PENDING" && (
            <Button type="primary" ghost onClick={() => handleConfirm(_id)}>
              Xác nhận
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Container>
        <h1>Quản lý phản hồi</h1>
        <Table columns={columns} dataSource={items} />
      </Container>
    </AdminLayout>
  );
};

export default Support;
