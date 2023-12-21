import { useRef, useState } from "react";
import "lightbox.js-react/dist/index.css";
import { Tag, Table, Space, Button, Input, InputRef } from "antd";
import Container from "../../components/Container";
import AdminLayout from "../../layouts/AdminLayout";
import { FeedBack, User } from "../../types";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";
import moment from "moment";
import Highlighter from "react-highlight-words";
import type { ColumnType } from "antd/es/table";
import { BiSearchAlt } from "react-icons/bi";
import type { FilterConfirmProps } from "antd/es/table/interface";
import FeedbackModal from "../../components/FeedbackModal";
import AuthorModal from "../../components/AuthorModal";

type UserIndex = keyof User;

const AdminDashboard = () => {
  const [data, setData] = useState<User[]>([
    {
      _id: "ce_1",
      name: "Thảo Nguyễn",
      status: "ACTIVE",
      role: ["user", "instructor"],
      createdAt: "2024-11-26T00:00:00.000Z",
      feedbacks: [
        {
          _id: "0122",
          createdAt: "2023-11-26T00:00:00.000Z",
          status: "PENDING",
          content: "Hủy đăng ký khóa học",
        },
        {
          _id: "0123",
          createdAt: "2023-11-25T00:00:00.000Z",
          status: "DONE",
          content: "Nội dung không giống như quảng cáo",
        },
      ],
    },
    {
      _id: "ce_2",
      name: "Hacker",
      status: "INACTIVE",
      role: ["user"],
      createdAt: "2023-11-26T00:00:00.000Z",
      feedbacks: [],
    },
    {
      _id: "ce_3",
      name: "admin",
      status: "INACTIVE",
      role: ["user", "admin"],
      createdAt: "2023-11-26T00:00:00.000Z",
      feedbacks: [],
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: UserIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleConfirm = (id: string) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          status: "INACTIVE",
        };
      }
      return item;
    });
    toast.success("Khoá tài khoản thành công");
    setData(updatedData);
  };

  const getColumnSearchProps = (dataIndex: UserIndex): ColumnType<User> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            danger
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<BiSearchAlt />}
            size="small"
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys as string[], confirm, dataIndex);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Tạo lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <BiSearchAlt style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [isOpenFeedbackModal, setIsOpenFeedbackModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FeedBack[]>([]);

  const [isOpenAuthorModal, setIsOpenAuthorModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleSelectedCourse = (feedbacks: FeedBack[]) => {
    setSelectedUser(feedbacks);
    setIsOpenFeedbackModal(true);
  };

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
      title: "Tên người dạy",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      render: (name, record: User) => {
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
      title: "Vai trò",
      dataIndex: "role",
      filters: [
        {
          text: "Người dùng",
          value: "user",
        },
        {
          text: "Người dạy",
          value: "instructor",
        },
        {
          text: "Admin",
          value: "admin",
        },
      ],
      onFilter: (value: any, record: User) => {
        const selectedRole = Array.isArray(value) ? value : [value];
        return (
          selectedRole.every((selectedCategory) =>
            record.role.includes(selectedCategory)
          ) &&
          selectedRole.some((selectedCategory) =>
            record.role.includes(selectedCategory)
          )
        );
      },
      render: (_, { role }) => (
        <>
          {role &&
            role.map((tag) => {
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
      filters: [
        {
          text: "Tài khoản đã bị khóa",
          value: "INACTIVE",
        },
        {
          text: "Tài khoản đang hoạt động",
          value: "ACTIVE",
        },
      ],
      render: (status) => {
        let color = "";
        let text = "";

        switch (status) {
          case "ACTIVE":
            color = "green";
            text = "Tài khoản đang hoạt động";
            break;
          case "INACTIVE":
            color = "red";
            text = "Tài khoản đã bị khóa";
            break;
          default:
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "actions",
      render: (_id: string, record: User) => {
        if (record.status === "ACTIVE") {
          return (
            <Space size="middle">
              <Button type="primary" ghost onClick={() => handleConfirm(_id)}>
                Khóa tài khoản
              </Button>
            </Space>
          );
        }
      },
    },
    {
      title: "Báo cáo",
      key: "feedbacks",
      dataIndex: "feedbacks",
      sorter: (a, b) => a.feedbacks.length - b.feedbacks.length,
      render: (_, record) => {
        return record.feedbacks.length > 0 ? (
          <div className="flex items-end text-xl text-red-500 font-bold">
            {record.feedbacks.length}
            <p
              onClick={() => handleSelectedCourse(record.feedbacks)}
              className="ml-1 font-medium text-sm hover:underline cursor-pointer mb-1"
            >
              Hiện thị
            </p>
          </div>
        ) : (
          <div>_</div>
        );
      },
    },
  ];

  return (
    <AdminLayout>
      <section className="space-y-5">
        <h1 className="font-medium text-2xl">Quản lý người dùng</h1>
        <FeedbackModal
          feedbacks={selectedUser}
          visible={isOpenFeedbackModal}
          onClose={() => setIsOpenFeedbackModal(false)}
        />
        <AuthorModal
          user_id={selectedUserId}
          visible={isOpenAuthorModal}
          onClose={() => setIsOpenAuthorModal(false)}
        />
        <Table columns={columns} dataSource={data} />
      </section>
    </AdminLayout>
  );
};

export default AdminDashboard;
