import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const RichTextEditor = ({ field, onPreviewContent }) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={field.value}
        onChange={(_, editor) => {
          const data = editor.getData();
          field.onChange(data);
          onPreviewContent(data);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
