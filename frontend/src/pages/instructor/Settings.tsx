import { useEffect, useState } from "react";
import Container from "../../components/Container";
import InstructorLayout from "../../layouts/InstructorLayout";
import { User } from "../../types";
import axios from "axios";
import { extractUsername } from "../../utils/extractUsername";
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const { TextArea } = Input;

type Individual = {
  user: User;
  carts: any[];
  reviews: any[];
};

type FieldType = {
  name?: string;
  bio?: string;
};

const Settings = () => {
  const [individual, setIndividual] = useState<Individual>({
    user: {},
    carts: [],
    reviews: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/user/profile`,
        { withCredentials: true }
      );
      setIndividual(data);
    };
    fetchData();
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    toast.success("Thay đổi thành công");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (!individual) {
    return null;
  }

  const { avatar, name, bio } = individual.user;

  return (
    <InstructorLayout>
      <div className="flex space-x-5 py-5">
        <div className="w-1/4">
          <div className="py-5 px-3 max-w-[300px] min-h-[500px] space-y-5 border border-neutral-300 rounded-xl shadow-md">
            <div className="flex flex-col items-center justify-center">
              <img
                className="relative h-[100px] w-[100px] rounded-xl object-cover mb-2"
                src={
                  avatar ||
                  "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                alt="avatar"
              />
              <p className="text-lg font-medium text-neutral-700">
                {extractUsername(name)}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-neutral-700">
                Giới thiệu
              </p>
              <div className="min-h-[200px] bg-neutral-50 p-5 text-neutral-400">
                {bio}
              </div>
              <Button>
                <Link to="/instructor/certificate">Gửi xác thực</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-3/4 space-y-3">
          <h1 className="text-2xl text-neutral-900 font-semibold mb-2">
            Cập nhật thông tin cá nhân
          </h1>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType> label="Tên người dùng" name="name">
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Giới thiệu bản thân" name="bio">
              <TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button htmlType="submit">Lưu</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </InstructorLayout>
  );
};

export default Settings;
