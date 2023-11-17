import parse from "html-react-parser";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";

const RichTextEditor = ({ field }) => {
  const [previewContent, setPreviewContent] = useState("");

  return (
    <div className="flex flex-col space-y-3">
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: ["italic", "bold"],
          },
        }}
        data={field.value}
        onChange={(_, editor) => {
          const data = editor.getData();
          field.onChange(data);
          setPreviewContent(data);
        }}
      />
      {previewContent && (
        <div className="flex flex-col">
          <h2 className="text-slate-700 text-lg font-bold my-3">
            Xem trước nội dung
          </h2>
          <div className="ring ring-emerald-400 py-5 px-3 max-w-full overflow-auto">
            <div className="max-w-full max-h-[300px] overflow-auto">
              {previewContent ? parse(previewContent) : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
