import { useState } from "react";
import { Image } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { Tag, Table, Space, Button } from "antd";
import InstructorLayout from "../../layouts/InstructorLayout";
import Container from "../../components/Container";

interface DataType {
  _id: string;
  realName: string;
  images: string[];
  status: string;
  category: string[];
}

const Admin = () => {
  const [data, setData] = useState<DataType[]>([
    {
      _id: "ce_1",
      realName: "Thảo Nguyễn",
      images: [
        "https://sununi.edu.vn/wp-content/uploads/2023/05/Ha-Phuong-723x1024.png",
        "https://quangcaosieutoc.com//upload/chung-chi-google-min.jpg",
      ],
      status: "PENDING",
      category: ["CNTT", "Phần mềm"],
    },
  ]);

  const handleConfirm = (id: string) => {
    console.log(`Confirmed for ID: ${id}`);
  };

  const handleReject = (id: string) => {
    console.log(`Rejected for ID: ${id}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Họ và tên",
      dataIndex: "realName",
      key: "realName",
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      render: (images: string[]) => (
        <div className="flex gap-2 max-w-[200px]">
          {images.map((imageUrl, index) => (
            <Image
              modalClose="clickOutside"
              image={{ src: imageUrl, title: index }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <>
          <Tag color="volcano">{status.toUpperCase()}</Tag>
        </>
      ),
    },
    {
      title: "Thể loại",
      key: "category",
      dataIndex: "category",
      render: (_, { category }) => (
        <>
          {category.map((tag) => (
            <Tag color="volcano" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      render: (_id: string) => (
        <Space size="middle">
          <Button type="primary" ghost onClick={() => handleConfirm(_id)}>
            Xác nhận
          </Button>
          <Button type="primary" danger onClick={() => handleReject(_id)}>
            Từ chối
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <InstructorLayout>
      <Container>
        <h1>Phê duyệt giấy chứng nhận</h1>
        <Table columns={columns} dataSource={data} />
      </Container>
    </InstructorLayout>
  );
};

export default Admin;
