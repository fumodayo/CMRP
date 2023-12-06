import Container from "../../components/Container";
import InstructorLayout from "../../layouts/InstructorLayout";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../context/Store";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import { Table, Tag } from "antd";

interface DataType {
  key: string;
  name: string;
  type: string;
  total_student: number;
  category: string[];
  status: string;
}

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
            <Tag color="volcano" key={tag}>
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
    render: (_, { status }) => (
      <Tag color="volcano" key={status}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
];

const Instructor = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store) || {};
  const { cart, userInfo } = state;
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/instructor/courses`,
        { withCredentials: true }
      );
      setCourseData(data);
    };
    fetchData();
  }, [userInfo]);

  return (
    <InstructorLayout>
      <Container>
        <div>
          <h2>Doanh thu tháng này</h2>
          <h2>Số tiền có thể rút</h2>
        </div>
        <h1>Khóa học</h1>
        <Table columns={columns} dataSource={courseData} />
      </Container>
    </InstructorLayout>
  );
};

export default Instructor;
