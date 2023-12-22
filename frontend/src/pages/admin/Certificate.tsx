import { useEffect, useState } from "react";
import { Image } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { Tag, Table, Space, Button } from "antd";
import AdminLayout from "../../layouts/AdminLayout";
import { Category, Certificate } from "../../types";
import { formatDate } from "../../utils/formatDate";
import moment from "moment";
import toast from "react-hot-toast";
import axios from "axios";
import AuthorModal from "../../components/AuthorModal";

const uniqueTypes = (data: Certificate[], kind: string) => {
  return Array.from(new Set(data.map((item) => item[kind]))).map((type) => ({
    text: type,
    value: type,
  }));
};

const AdminCertificate = () => {
  const [data, setData] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/admin/certificate`,
        {
          withCredentials: true,
        }
      );
      console.log("data", data);
      setData(data);
    };
    fetchData();
  }, []);

  const [filterByAuthor, setFilterByAuthor] = useState<any[]>([]);
  const [filterByCategory, setFilterByCategory] = useState<any[]>([]);

  useEffect(() => {
    const author = uniqueTypes(data, "name");
    const fetchCategories = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/category`);
      const categories = data.map((item: Category) => ({
        text: item.name,
        value: item.value,
      }));
      setFilterByCategory(categories);
    };

    fetchCategories();

    setFilterByAuthor(author);
  }, [data]);

  const handleConfirm = async (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "CONFIRM" };
      }
      return item;
    });
    setData(updatedData);
    const body = { status: "CONFIRM" };
    await axios.put(`http://localhost:8080/api/admin/certificate/${id}`, body, {
      withCredentials: true,
    });
    toast.success("Xác nhận chứng chỉ đạt");
  };

  const handleReject = async (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, status: "FAILURE" };
      }
      return item;
    });
    setData(updatedData);
    const body = { status: "FAILURE" };
    await axios.put(`http://localhost:8080/api/admin/certificate/${id}`, body, {
      withCredentials: true,
    });
    toast.success("Xác nhận chứng chỉ chưa đạt");
  };

  const [isOpenAuthorModal, setIsOpenAuthorModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("user_1");

  const handleSelectedAuthor = (user_id: string) => {
    setSelectedUserId(user_id);
    setIsOpenAuthorModal(true);
  };

  const columns = [
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        return formatDate(createdAt);
      },
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      defaultSortOrder: "descend",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      filters: filterByAuthor,
      onFilter: (value: any, record: Certificate) =>
        record.realName?.indexOf(value) === 0,
      render: (name, record) => {
        return (
          <div
            onClick={() => handleSelectedAuthor(record._id)}
            className="hover:font-medium hover:underline cursor-pointer"
          >
            {name}
          </div>
        );
      },
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
      filters: [
        {
          text: "Chưa xử lý",
          value: "PENDING",
        },
        {
          text: "Đã xác nhận",
          value: "COMPELETED",
        },
        {
          text: "Chưa đạt",
          value: "FAILURE",
        },
      ],
      onFilter: (value: any, record: Certificate) => record.status === value,
      render: (status) => {
        let color = "";
        let text = "";

        switch (status) {
          case "PENDING":
            color = "volcano";
            text = "CHƯA XỬ LÝ";
            break;
          case "COMPLETED":
            color = "green";
            text = "ĐÃ XÁC NHẬN";
            break;
          case "FAILURE":
            color = "red";
            text = "CHƯA ĐẠT";
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
      filters: filterByCategory,
      onFilter: (value: any, record: Certificate) => {
        const selectedCategories = Array.isArray(value) ? value : [value];
        return (
          selectedCategories.every((selectedCategory) =>
            record.category?.includes(selectedCategory)
          ) &&
          selectedCategories.some((selectedCategory) =>
            record.category?.includes(selectedCategory)
          )
        );
      },
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
      render: (_id: string, record: Certificate) => (
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
      <section className="space-y-5">
        <AuthorModal
          user_id={selectedUserId}
          visible={isOpenAuthorModal}
          onClose={() => setIsOpenAuthorModal(false)}
        />
        <h1 className="font-medium text-2xl">Phê duyệt giấy chứng nhận</h1>
        <Table columns={columns} dataSource={data} />
      </section>
    </AdminLayout>
  );
};

export default AdminCertificate;
