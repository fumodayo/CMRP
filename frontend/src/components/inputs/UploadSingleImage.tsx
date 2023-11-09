import { useState } from "react";
import Input from "./Input";

const UploadSingleImage = ({ register, errors }) => {
  const [previewImage, setPreviewImage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(image);
    }
  };

  return (
    <div>
      <Input
        id="image"
        placeholder="Hình ảnh"
        type="file"
        register={register}
        errors={errors}
        onChange={handleImageChange}
        required
      />
      {previewImage && (
        <img
          className="relative my-5 p-3 min-w-full h-[350px] rounded-xl object-cover ring ring-emerald-400"
          src={previewImage}
          alt="course"
        />
      )}
    </div>
  );
};

export default UploadSingleImage;
