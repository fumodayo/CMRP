import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Select, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CertificateStep = ({ onAuthentic }) => {
  const [form] = Form.useForm();
  const [categoriesData, setCategoryData] = useState([]);
  const [storage, setStorage] = useState([]);

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

  const handleFormChange = (_, allValues) => {
    if (allValues && Array.isArray(allValues.items)) {
      const transformedData = allValues.items.map((item) => {
        const category = item?.category || "";
        const images = Array.isArray(item?.images)
          ? item.images.map((image) => image?.response?.url || "")
          : [];

        return {
          category,
          images,
        };
      });

      setStorage(transformedData);
    }
  };

  useEffect(() => {
    onAuthentic(storage);
  }, [storage]);

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      onValuesChange={handleFormChange}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
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
                  rules={[
                    { required: true, message: "Vui lòng chọn hình ảnh" },
                  ]}
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
    </Form>
  );
};

export default CertificateStep;
