import {
  Form,
  Input,
  Modal,
  Button,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { Course } from "../types";
import toast from "react-hot-toast";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

interface EditCourseModalProps {
  course_id: string;
  visible: boolean;
  onClose: () => void;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  course_id,
  visible,
  onClose,
}) => {
  const [categoriesData, setCategoryData] = useState([]);
  const [detailCourse, setDetailCourse] = useState({
    short_description: "",
    description: "",
    requirement: "",
  });

  const handleDetailChange = (editor, field) => {
    const value = editor.getData();
    setDetailCourse({ ...detailCourse, [field]: value });
  };

  const [isShowInputAddress, setIsShowInputAddress] = useState(false);

  const handleSelectChange = (selected: string) => {
    setIsShowInputAddress(selected === "offline" || selected === "hybrid");
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/category`);
      const categories = data.map((item) => ({
        label: item.name,
        value: item.value,
      }));
      setCategoryData(categories);
    };
    fetchData();
  }, []);

  // const checkPrice = (_: any, value) => {
  //   if (value > 20000) {
  //     return Promise.resolve();
  //   }
  //   return Promise.reject(new Error("Số tiền phải lớn hơn 20.000đ"));
  // };

  const [previewImage, setPreviewImage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(image);
    }
  };

  const onFinish = async (values: any) => {
    const image = previewImage;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mwdchmys");
    formData.append("cloud_name", "du93troxt");
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/du93troxt/image/upload/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
    // const newCourse = { ...values, ...detailCourse, image: data.url };
    // console.log("Success:", newCourse);
    toast.success("Thay đổi thành công");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      className="w-full min-w-[70vw] max-w-4xl"
      title="Chỉnh sửa thông tin khóa học"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        name="basic"
        className="flex"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="w-1/2">
          <Form.Item<Course> label="Tên khóa học" name="name">
            <Input />
          </Form.Item>

          <Form.Item<Course>
            label="Số lượng học viên tối thiểu"
            name="total_student"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item<Course>
            label="Giá buổi học"
            name="price"
            // rules={[{ validator: checkPrice }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              prefix="VNĐ"
            />
          </Form.Item>

          <Form.Item<Course> label="Loại hình" name="type">
            <Select
              style={{ width: 120 }}
              options={[
                { value: "online", label: "Online" },
                { value: "offline", label: "Offline" },
                { value: "hybrid", label: "Hybrid" },
              ]}
              onChange={(value) => handleSelectChange(value)}
            />
          </Form.Item>

          {isShowInputAddress && (
            <Form.Item<Course> label="Địa chỉ dạy học" name="address">
              <Input />
            </Form.Item>
          )}

          <Form.Item<Course> label="Link youtube giới thiệu" name="thumbnail">
            <Input />
          </Form.Item>

          <Form.Item label="Ảnh khóa học" name="image">
            <input type="file" onChange={handleImageChange} />
            {previewImage && (
              <img
                className="relative my-5 p-3 min-w-full h-[200px] rounded-xl object-cover ring ring-emerald-400"
                src={previewImage}
                alt="course"
              />
            )}
          </Form.Item>

          <Form.Item<Course> label="Thể loại" name="category">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Hãy lựa chọn thể loại"
              options={categoriesData}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit">Lưu</Button>
          </Form.Item>
        </div>
        <div className="w-1/2">
          <Form.Item<Course> label="Tóm tắt">
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: {
                  items: ["italic", "bold"],
                },
              }}
              onChange={(_, editor) =>
                handleDetailChange(editor, "short_description")
              }
            />
          </Form.Item>
          <Form.Item<Course> label="Nột dung">
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: {
                  items: ["italic", "bold"],
                },
              }}
              onChange={(_, editor) =>
                handleDetailChange(editor, "description")
              }
            />
          </Form.Item>
          <Form.Item<Course> label="Yêu cầu">
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: {
                  items: ["italic", "bold"],
                },
              }}
              onChange={(_, editor) =>
                handleDetailChange(editor, "requirement")
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditCourseModal;
