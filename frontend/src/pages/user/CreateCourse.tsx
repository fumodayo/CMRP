import { useCallback, useContext, useEffect, useState } from "react";
import { Button, message } from "antd";
import {
  ProFormDigit,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
  StepsForm,
} from "@ant-design/pro-components";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Booking from "../../components/inputs/Booking";
import UserLayout from "../../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { Store } from "../../context/Store";
import toast from "react-hot-toast";
import { Course } from "../../types";

const checkPrice = (_: any, value) => {
  if (value > 20000) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Số tiền phải lớn hơn 20.000đ"));
};

const validatePositiveNumber = (_, value) => {
  if (value > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Số phải lớn hơn 0"));
};

const CreateCourse = () => {
  const navigator = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [isShowInputAddress, setIsShowInputAddress] = useState(false);
  const [nameCourse, setNameCourse] = useState<Course>();
  const [categoriesData, setCategoryData] = useState([]);
  const [detailCourse, setDetailCourse] = useState({
    short_description: "",
    description: "",
    requirement: "",
  });

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

  const handleDetailChange = (editor, field) => {
    const value = editor.getData();
    setDetailCourse({ ...detailCourse, [field]: value });
  };

  const handleSelectChange = (selected: string) => {
    setIsShowInputAddress(selected === "offline" || selected === "hybrid");
  };

  const [bookingData, setBookingData] = useState({
    schedule: [],
    startDate: null,
    endDate: null,
  });

  const handleBooking = useCallback((value) => {
    setBookingData(value);
  }, []);

  return (
    <UserLayout>
      <div className="mt-10">
        <StepsForm
          submitter={{
            render: (props) => {
              if (props.step === 0) {
                return (
                  <div className="my-10">
                    <Button onClick={() => props.onSubmit?.()}>
                      Tiếp theo {">"}
                    </Button>
                  </div>
                );
              }

              return [
                <div className="my-10">
                  <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                    {"<"} Trở lại
                  </Button>
                  ,
                  <Button key="goToTree" onClick={() => props.onSubmit?.()}>
                    Hoàn thành √
                  </Button>
                  ,
                </div>,
              ];
            },
          }}
        >
          <StepsForm.StepForm
            name="detail"
            title="Khóa học"
            onFinish={async (values) => {
              setNameCourse(values);
              return true;
            }}
          >
            <div className="flex gap-10">
              <div className="1/2">
                <ProFormText
                  name="name"
                  label="Tên khóa học"
                  width="md"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên khóa học" },
                  ]}
                />
                <ProFormDigit
                  label="Số lượng học viên tối thiểu"
                  name="total_student"
                  width="md"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số lượng học viên",
                    },
                    { validator: validatePositiveNumber },
                  ]}
                />
                <ProFormMoney
                  label="Giá buổi học"
                  name="price"
                  rules={[{ required: true, validator: checkPrice }]}
                  width="md"
                  fieldProps={{
                    precision: 1000,
                    formatter: (value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  }}
                />
                <ProFormSelect
                  label="Loại hình"
                  name="type"
                  rules={[
                    { required: true, message: "Vui lòng chọn loại hình" },
                  ]}
                  options={[
                    { value: "online", label: "Online" },
                    { value: "offline", label: "Offline" },
                    { value: "hybrid", label: "Hybrid" },
                  ]}
                  onChange={(value) => handleSelectChange(value)}
                />
                {isShowInputAddress && (
                  <ProFormText
                    label="Địa chỉ dạy học"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ dạy học",
                      },
                    ]}
                  />
                )}
                <ProFormText
                  rules={[
                    {
                      pattern:
                        /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+/,
                      message: "Vui lòng nhập đúng định dạng link YouTube.",
                    },
                  ]}
                  label="Link youtube giới thiệu"
                  name="thumbnail"
                />
                <ProFormUploadButton
                  rules={[{ required: true, message: "Vui lòng tải ảnh lên" }]}
                  action="http://localhost:8080/api/upload/single"
                  title="Tải hình ảnh lên"
                  name="image"
                  label="Hình ảnh khóa học (Nên upload ảnh có kích thước không quá nhỏ)"
                />
                <ProFormSelect
                  label="Thể loại"
                  name="category"
                  fieldProps={{
                    mode: "multiple",
                  }}
                  rules={[
                    { required: true, message: "Vui lòng chọn thể loại" },
                  ]}
                  options={categoriesData}
                />
              </div>
              <div className="1/2 space-y-5">
                <div className="min-w-[600px]">
                  <label>Tóm tắt</label>
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
                </div>
                <div className="min-w-[600px]">
                  <label>Nội dung</label>
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
                </div>
                <div className="min-w-[600px]">
                  <label>Yêu cầu</label>
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
                </div>
              </div>
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="schedule"
            title="Lịch học"
            onFinish={async () => {
              if (bookingData.startDate && bookingData.endDate) {
                const body = {
                  ...nameCourse,
                  ...bookingData,
                  ...detailCourse,
                  image: nameCourse.image[0].response.url,
                  address: {
                    name: nameCourse?.address,
                    lat: 0,
                    lng: 0,
                  },
                };
                console.log(body);

                await axios.post(
                  `http://localhost:8080/api/user/course`,
                  body,
                  { withCredentials: true }
                );

                message.success("Tạo khóa học thành công");
                if (userInfo.isCertificate === false) {
                  navigator("/certificate");
                }
                return true;
              } else {
                toast.error("Thêm ngày bắt đầu ngày kết thúc");
                return false;
              }
            }}
          >
            <Booking
              nameCourse={nameCourse?.name}
              onChangeBooking={handleBooking}
            />
          </StepsForm.StepForm>
          <Button className="custom-button-prev">Back</Button>
        </StepsForm>
      </div>
    </UserLayout>
  );
};

export default CreateCourse;
