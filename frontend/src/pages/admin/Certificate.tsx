import { useState } from "react";
import { Image } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { Tag, Table, Space, Button } from "antd";
import Container from "../../components/Container";
import AdminLayout from "../../layouts/AdminLayout";

interface DataType {
  _id: string;
  realName: string;
  images: string[];
  status: string;
  category: string[];
}

const AdminCertificate = () => {
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
    {
      _id: "ce_2",
      realName: "Thảo Nguyễn",
      images: [
        "https://sununi.edu.vn/wp-content/uploads/2023/05/Ha-Phuong-723x1024.png",
        "https://quangcaosieutoc.com//upload/chung-chi-google-min.jpg",
      ],
      status: "CONFIRM",
      category: ["CNTT", "Phần mềm"],
    },
    {
      _id: "ce_3",
      realName: "Thảo Nguyễn",
      images: [
        "https://sununi.edu.vn/wp-content/uploads/2023/05/Ha-Phuong-723x1024.png",
        "https://quangcaosieutoc.com//upload/chung-chi-google-min.jpg",
      ],
      status: "FAILURE",
      category: ["CNTT", "Phần mềm"],
    },
  ]);

  const handleConfirm = (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "CONFIRM" };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleReject = (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "FAILURE" };
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
      render: (status) => {
        let color = "";
        let text = "";

        switch (status) {
          case "PENDING":
            color = "volcano";
            text = "ĐANG CHỜ";
            break;
          case "CONFIRM":
            color = "green";
            text = "ĐÃ XÁC NHẬN";
            break;
          case "FAILURE":
            color = "red";
            text = "THẤT BẠI";
            break;
          default:
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
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
      render: (_id: string, record: DataType) => (
        <Space size="middle">
          {record.status === "PENDING" && (
            <>
              <Button type="primary" ghost onClick={() => handleConfirm(_id)}>
                Xác nhận
              </Button>
              <Button type="primary" danger onClick={() => handleReject(_id)}>
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Container>
        <h1>Phê duyệt giấy chứng nhận</h1>
        <Table columns={columns} dataSource={data} />
      </Container>
    </AdminLayout>
  );
};

export default AdminCertificate;
