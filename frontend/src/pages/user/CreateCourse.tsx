import { useCallback, useState } from "react";
import { ClipLoader } from "react-spinners";
import { HiArrowSmRight } from "react-icons/hi";
import { Controller, useForm } from "react-hook-form";
import parse from "html-react-parser";
import Container from "../../components/Container";
import Input from "../../components/inputs/Input";
import RichTextEditor from "../../components/inputs/RichTextEditor";
import TimeDurationPicker from "../../components/inputs/TimeDurationPicker";
import UploadSingleImage from "../../components/inputs/UploadSingleImage";
import MultiSelect from "../../components/inputs/MultiSelect";
import Select from "../../components/inputs/Select";
import { Switch } from "@mui/material";
import UserLayout from "../../layouts/UserLayout";

const CreateCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkedContent, setCheckedContent] = useState(false);
  const [isShowPreviewContent, setShowPreviewContent] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [isShowInputAddress, setIsShowInputAddress] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback((data: any) => {
    // if (data.content.trim() === "") {
    //   setCheckedContent(true);
    // }
    // setCheckedContent(false);

    console.log(data);
  }, []);

  const handleSelectChange = (selected: string) => {
    setIsShowInputAddress(selected === "offline" || selected === "hybrid");
  };

  return (
    <UserLayout>
      <Container>
        <h1 className="text-slate-700 text-2xl font-bold my-3">Tạo khóa học</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                name="location"
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
          </div>
          <div className="py-5">
            <Controller
              name="category"
              control={control}
              render={({ field }) => <MultiSelect field={field} />}
            />
          </div>

          <UploadSingleImage register={register} errors={errors} />

          <Controller
            name="date"
            control={control}
            defaultValue={new Date()}
            render={({ field }) => <TimeDurationPicker field={field} />}
          />
          <div>
            <h2 className="text-slate-700 text-xl font-bold my-3">
              Nội dung
              <Switch
                onChange={() => setShowPreviewContent(!isShowPreviewContent)}
              />
            </h2>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <RichTextEditor
                    field={field}
                    onPreviewContent={setPreviewContent}
                  />
                  {checkedContent && <span>Không được để trống</span>}
                </>
              )}
            />
            {isShowPreviewContent && (
              <div>
                <h2 className="text-slate-700 text-xl font-bold my-3">
                  Xem trước nội dung
                </h2>
                <div className="ring ring-emerald-400 py-5 px-3">
                  {previewContent ? parse(previewContent) : ""}
                </div>
              </div>
            )}
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
      </Container>
    </UserLayout>
  );
};

export default CreateCourse;
