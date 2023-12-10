import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Container from "../../components/Container";
import AdminLayout from "../../layouts/AdminLayout";
import { useState } from "react";

interface DataType {
  key: string;
  name: string;
  author: string;
  type: string;
  total_student: number;
  category: string[];
  status: string;
}

const Courses = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: "course_1",
      name: "course",
      author: "Thao Nguyen",
      type: "offline",
      total_student: 23,
      category: ["CNTT", "VN"],
      status: "PENDING",
    },
    {
      key: "course_2",
      name: "course",
      author: "Thao Nguyen",
      type: "offline",
      total_student: 23,
      category: ["CNTT", "VN"],
      status: "OPEN",
    },
    {
      key: "course_3",
      name: "course",
      author: "Thao Nguyen",
      type: "offline",
      total_student: 23,
      category: ["CNTT", "VN"],
      status: "COMPLETED",
    },
  ]);

  const handleConfirm = (id: string) => {
    const updatedData = data.map((item) => {
      if (item.key === id) {
        return { ...item, status: "OPEN" };
      }
      return item;
    });
    setData(updatedData);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tổng số học viên tối thiểu",
      dataIndex: "total_student",
      key: "total_student",
    },
    {
      title: "Thể loại",
      key: "category",
      dataIndex: "category",
      render: (_, { category }) => (
        <>
          {category.map((tag) => {
            return (
              <Tag color="blue" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        let text = "";

        switch (status) {
          case "COMPLETED":
            color = "volcano";
            text = "THÀNH CÔNG";
            break;
          case "OPEN":
            color = "green";
            text = "MỞ";
            break;
          case "IN_PROGRESS":
            color = "red";
            text = "TRONG QUÁ TRÌNH";
            break;
          case "AWAITING":
            color = "pink";
            text = "ĐANG CHỜ THANH TOÁN TIỀN";
            break;
          case "REJECTED":
            color = "lime";
            text = "THẤT BẠI";
            break;
          case "PENDING":
            color = "geekblue";
            text = "ĐANG CHỜ XỬ LÝ";
            break;
          default:
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "status",
      key: "actions",
      render: (status, record: DataType) => {
        if (record.status === "PENDING") {
          return (
            <Button
              type="primary"
              ghost
              onClick={() => handleConfirm(record.key)}
            >
              Mở
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <AdminLayout>
      <Container>
        <section className="space-y-5">
          <h1 className="font-medium text-2xl">Khóa học</h1>
          <Table columns={columns} dataSource={data} />
        </section>
      </Container>
    </AdminLayout>
  );
};

export default Courses;
