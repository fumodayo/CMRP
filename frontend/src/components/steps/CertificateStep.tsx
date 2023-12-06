import { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Dropzone from "../../components/inputs/Dropzone";
import Category from "../listings/Category";

const CertificateStep = ({ onAuthentic }) => {
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
      category: categories,
      images: selectedFiles,
    });
  }, [categories, selectedFiles]);

  return (
    <div className="py-10">
      <h1>Lựa chọn thể loại của bạn</h1>
      <Category onChange={setCategories} />
      <Dropzone
        className="p-16 mt-10 border border-neutral-200"
        handleFileChange={handleFileChange}
      />
      {/* Hiển thị hình ảnh đã chọn */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Hình ảnh đã chọn:</h2>
        <ul className="list-none mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
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
                className="w-7 h-7 absolute -top-3 -right-3"
                onClick={() => removeFile(file.name)}
              >
                <IoIosCloseCircle className="w-7 h-7 fill-secondary-500 hover:fill-secondary-400 transition-colors" />
              </button>
              <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                {file.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CertificateStep;
