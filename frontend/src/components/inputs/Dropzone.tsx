import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [rejected, setRejected] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("upload_preset", "friendsbook");

    console.log(files);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <BsFileEarmarkArrowUp className="w-5 h-5 fill-current" />
          {isDragActive ? (
            <p>Kéo và thả tập tin vào đây...</p>
          ) : (
            <p>Kéo và thả tập tin vào đây hoặc nhấn để chọn tập tin</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mt-10">
        <div className="flex gap-4">
          <h2 className="title text-3xl font-semibold">Xem trước</h2>
          <button
            type="button"
            onClick={removeAll}
            className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
          >
            Xóa toàn bộ
          </button>
          <button
            type="submit"
            className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors"
          >
            Tải lên
          </button>
        </div>
        {/* Accepted files */}
        <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
          Những tệp được chấp nhận
        </h3>
        <ul className="list-none mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
          {files.map((file) => (
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

        {/* Rejected Files */}
        <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
          Tệp lỗi
        </h3>
        <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-neutral-500 text-sm font-medium">
                  {file.name}
                </p>
                <ul className="text-[12px] text-red-400">
                  {errors.map((error) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                onClick={() => removeRejected(file.name)}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      </section>
    </form>
  );
};

export default Dropzone;
