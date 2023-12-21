import { useEffect, useState } from "react";
import { Course, FeedBack } from "../types";
import { ColumnsType } from "antd/es/table";
import { Button, Modal, Tag, Table } from "antd";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatDate";
import moment from "moment";

interface FeedbackModalProps {
  feedbacks: FeedBack[];
  visible: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  feedbacks,
  visible,
  onClose,
}) => {
  const [ticket, setTicket] = useState(feedbacks);

  useEffect(() => {
    setTicket(feedbacks);
  }, [feedbacks]);

  const handleConfirm = (id: string) => {
    const updatedItems = ticket.map((item) => {
      if (item._id === id && item.status === "PENDING") {
        return {
          ...item,
          status: "DONE",
        };
      }
      return item;
    });
    toast.success("Xử lý thành công");
    setTicket(updatedItems);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Ticket",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        return formatDate(createdAt);
      },
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      defaultSortOrder: "descend",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Đang xử lý",
          value: "PENDING",
        },
        {
          text: "Đã xử lý",
          value: "DONE",
        },
      ],
      onFilter: (value: any, record: Course) => record.status === value,
      render: (status: string) => (
        <Tag color={status === "PENDING" ? "volcano" : "green"}>
          {status === "PENDING" ? "ĐANG XỬ LÝ" : "ĐÃ XỬ LÝ"}
        </Tag>
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
      render: (_id: string, record: Course) => (
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
    <Modal
      className="min-w-[1600px]"
      title="Báo cáo về khóa học"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Table columns={columns} dataSource={ticket} />
    </Modal>
  );
};

export default FeedbackModal;
