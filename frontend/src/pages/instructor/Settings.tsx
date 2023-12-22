import { useEffect, useState } from "react";
import InstructorLayout from "../../layouts/InstructorLayout";
import { User } from "../../types";
import axios from "axios";
import { extractUsername } from "../../utils/extractUsername";
import { Button, Form, Input, Upload } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImgCrop from "antd-img-crop";

const { TextArea } = Input;

const getSrcFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

const Settings = () => {
  const navigate = useNavigate();

  const [individual, setIndividual] = useState<User>({
    user: {},
    carts: [],
    reviews: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/instructor/profile`,
        { withCredentials: true }
      );
      setIndividual(data);
    };
    fetchData();
  }, []);

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const onFinish = async (values: any) => {
    let body;
    if (fileList.length > 0) {
      body = { ...values, avatar: fileList[0]?.response.url };
    } else {
      body = { ...values };
    }
    const { data } = await axios.put(
      `http://localhost:8080/api/instructor/update-profile`,
      body,
      { withCredentials: true }
    );
    console.log(data);
    if (data) {
      toast.success("Thay đổi thành công");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (!individual) {
    return null;
  }

  const { avatar, name, bio } = individual;

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
              <Button onClick={() => navigate("/instructor/certificate")}>
                Gửi xác thực
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
            <Form.Item<User> label="Ảnh đạt diện">
              <ImgCrop
                modalTitle="Cắt hình ảnh"
                showGrid
                rotationSlider
                aspectSlider
                showReset
              >
                <Upload
                  maxCount={1}
                  action="http://localhost:8080/api/upload/single"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 3 && "+ Tải ảnh lên"}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item<User> label="Tên người dùng" name="name">
              <Input />
            </Form.Item>

            <Form.Item<User> label="Giới thiệu bản thân" name="bio">
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
