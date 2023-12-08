import { useDropzone } from "react-dropzone";
import { BsFileEarmarkArrowUp } from "react-icons/bs";

const Dropzone = ({ className, handleFileChange }) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const updatedFiles = acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      handleFileChange(updatedFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  return (
    <form>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <BsFileEarmarkArrowUp className="w-5 h-5 fill-current" />
          {isDragActive ? (
            <p className="text-sm">Kéo và thả tập tin vào đây...</p>
          ) : (
            <p className="text-sm">Kéo và thả tập tin vào đây hoặc nhấn để chọn tập tin</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Dropzone;
