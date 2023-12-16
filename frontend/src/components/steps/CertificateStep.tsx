import { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Dropzone from "../../components/inputs/Dropzone";
import Category from "../listings/Category";

const CertificateStep = ({ id, onAuthentic }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState([]);

  const handleFileChange = (files: File[]) => {
    setSelectedFiles((previousFiles) => {
      const filteredFiles = files.filter(
        (newFile) =>
          !previousFiles.some(
            (existingFile) => existingFile.name === newFile.name
          )
      );
      return [...previousFiles, ...filteredFiles];
    });
  };

  const removeFile = (name: string) => {
    setSelectedFiles((files) => files.filter((file) => file.name !== name));
  };

  useEffect(() => {
    return () =>
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [selectedFiles]);

  useEffect(() => {
    onAuthentic({
      id: id,
      category: categories,
      // images: selectedFiles,
      images: [
        "https://sununi.edu.vn/wp-content/uploads/2023/05/Ha-Phuong-723x1024.png",
        "https://quangcaosieutoc.com//upload/chung-chi-google-min.jpg",
      ],
    });
  }, [categories, selectedFiles, id]);

  return (
    <div className="py-10">
      <h1>Lựa chọn thể loại của bạn</h1>
      <Category onChange={setCategories} />
      {/* Hiển thị hình ảnh đã chọn */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Hình ảnh đã chọn:</h2>
        <ul className="bg-gray-100 px-3 py-2 list-none mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
          {selectedFiles.map((file) => (
            <li key={file.name} className="relative h-32 rounded-md shadow-lg">
              <img
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="h-full w-full object-contain rounded-md"
              />
              <button
                type="button"
                className="w-7 h-7 absolute -top-0 -right-3"
                onClick={() => removeFile(file.name)}
              >
                <IoIosCloseCircle className="w-7 h-7 fill-secondary-500 hover:fill-secondary-400 transition-colors" />
              </button>
              <p className="mt-1 truncate text-neutral-500 text-[12px] font-medium">
                {file.name}
              </p>
            </li>
          ))}
          <Dropzone
            className="p-4 mt-2 rounded-xl border-2 border-dashed border-neutral-400"
            handleFileChange={handleFileChange}
          />
        </ul>
      </div>
    </div>
  );
};

export default CertificateStep;
