import { useCallback, useContext, useState } from "react";
import { ClipLoader } from "react-spinners";
import { HiArrowSmRight } from "react-icons/hi";
import { Controller, useForm } from "react-hook-form";
import Container from "../../components/Container";
import Input from "../../components/inputs/Input";
import RichTextEditor from "../../components/inputs/RichTextEditor";
import MultiSelect from "../../components/inputs/MultiSelect";
import Select from "../../components/inputs/Select";
import UserLayout from "../../layouts/UserLayout";
import Booking from "../../components/inputs/Booking";
import { useNavigate } from "react-router-dom";
import UploadSingleImage from "../../components/inputs/UploadSingleImage";
import { Store } from "../../context/Store";
import axios from "axios";

const CreateCourse = () => {
  const navigator = useNavigate();
  const { state } = useContext(Store) ?? {};
  const userInfo = state?.userInfo;

  const [isLoading, setIsLoading] = useState(false);
  const [isShowInputAddress, setIsShowInputAddress] = useState(false);

  const [bookingData, setBookingData] = useState({
    lesson: 0,
    schedule: [],
    startDate: null,
    endDate: null,
  });

  const handleBooking = useCallback(
    (lesson: number, schedule: any, startDate: any, endDate: any) => {
      setBookingData({ lesson, schedule, startDate, endDate });
    },
    []
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    async (course: any) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", course.image[0]);

      const { data } = await axios.post(
        `http://localhost:8080/api/upload/single`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const createCourse = {
        author: userInfo.name,
        name: course.name,
        image: data.url,
        category: course.category,
        price: parseInt(course.price),
        requirement: course.requirement,
        short_description: course.short_description,
        thumbnail: course.thumbnail,
        total_student: parseInt(course.total_student),
        type: course.type,
        schedule: bookingData.schedule,
        lesson: bookingData.lesson,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
      };

      console.log(createCourse);

      const res = await axios.post(
        `http://localhost:8080/api/course`,
        createCourse
      );

      console.log(res.data);

      // navigator(`/certificate`);
    },
    [bookingData, userInfo.name]
  );

  const handleSelectChange = (selected: string) => {
    setIsShowInputAddress(selected === "offline" || selected === "hybrid");
  };

  return (
    <UserLayout>
      <Container>
        <section className="space-y-5">
          <h1 className="text-slate-700 text-2xl font-bold">Tạo khóa học</h1>
          <div className="space-y-5">
            <h2 className="text-slate-500 text-xl font-bold">
              Bước 1: Tạo lịch học
            </h2>
            <Booking onChangeBooking={handleBooking} />
          </div>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-slate-500 text-xl font-bold">
              Bước 2: Tạo thông tin chung
            </h2>
            <div className="grid grid-cols-2 grid-flow-row gap-4">
              <Input
                id="name"
                placeholder="Tên khóa học"
                register={register}
                errors={errors}
                required
              />
              <Input
                id="total_student"
                placeholder="Số lượng học viên tối thiểu"
                type="number"
                register={register}
                errors={errors}
                required
              />
              <Input
                id="price"
                placeholder="Giá buổi học"
                type="number"
                register={register}
                errors={errors}
                required
              />
              <div>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select field={field} onSelectChange={handleSelectChange} />
                  )}
                />
                {isShowInputAddress && (
                  <Input
                    id="address"
                    placeholder="Địa chỉ dạy"
                    register={register}
                    errors={errors}
                    required
                  />
                )}
              </div>
              <Input
                id="thumbnail"
                placeholder="Link youtube giới thiệu khóa học"
                register={register}
                errors={errors}
              />

              <UploadSingleImage register={register} errors={errors} />
            </div>
            <div className="py-5">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    array={[
                      {
                        name: "Vẽ",
                        value: "Vẽ",
                      },
                      { name: "Thiết kế", value: "Thiết kế" },
                      {
                        name: "Phát triển bản thân",
                        value: "Phát triển bản thân",
                      },
                    ]}
                    name="Thể loại"
                    field={field}
                  />
                )}
              />
            </div>

            <div className="flex items-start justify-between space-x-10">
              <div className="w-1/3">
                <h3>Tóm tắt</h3>
                <Controller
                  name="short_description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <RichTextEditor field={field} />}
                />
              </div>
              <div className="w-1/3">
                <h3>Nội dung</h3>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <RichTextEditor field={field} />}
                />
              </div>
              <div className="w-1/3">
                <h3>Yêu cầu</h3>
                <Controller
                  name="requirement"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <RichTextEditor field={field} />}
                />
              </div>
            </div>

            <button
              type="submit"
              className="relative overflow-hidden font-semibold inline-flex justify-center items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 shadow-sm text-white py-3 sm:py-2.5 px-3.5 text-sm rounded-md w-[200px] mt-4"
            >
              {isLoading ? (
                <ClipLoader size={25} color="green" />
              ) : (
                <>
                  Tạo khóa học
                  <HiArrowSmRight size={25} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </section>
      </Container>
    </UserLayout>
  );
};

export default CreateCourse;
