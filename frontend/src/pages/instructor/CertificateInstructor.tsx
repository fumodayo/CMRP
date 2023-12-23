import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Select, Typography, Upload } from "antd";
import InstructorLayout from "../../layouts/InstructorLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CertificateInstructor = () => {
  const [form] = Form.useForm();
  const [categoriesData, setCategoryData] = useState([]);

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

  const handleSubmit = async () => {
    const data = form.getFieldsValue();
    const categories = data.items.map((item) => ({
      label: item.name,
      value: item.value,
    }));
    console.log(categories);

    const body = { certificates: categories };
    await axios.post(
      `http://localhost:8080/api/instructor/post-certificate`,
      body,
      {
        withCredentials: true,
      }
    );
    toast.success("Gửi chứng chỉ thành công");
  };

  return (
    <InstructorLayout>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Chứng chỉ thứ ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    label="Loại hình"
                    rules={[
                      { required: true, message: "Vui lòng chọn thể loại" },
                    ]}
                    name={[field.name, "category"]}
                  >
                    <Select mode="multiple" options={categoriesData} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "images"]}
                    label="Tải ảnh lên"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      action="http://localhost:8080/api/upload/single"
                      listType="picture-card"
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Thêm chứng chỉ
              </Button>
            </div>
          )}
        </Form.List>

        <Button onClick={handleSubmit}>Gửi</Button>
      </Form>
    </InstructorLayout>
  );
};

export default CertificateInstructor;
