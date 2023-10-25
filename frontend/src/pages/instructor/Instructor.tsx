import Container from "../../components/Container";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import { useState } from "react";

const Instructor = () => {
  const [addData, setVal] = useState("");
  const [addedData, showData] = useState(false);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setVal(data);
  };

  return (
    <Container>
      <div>
        <h2>Using CKEditor 5 build in React</h2>
        <button onClick={() => showData(!addedData)}>
          {addData ? "Hide data" : "Show data"}
        </button>
        <CKEditor
          editor={ClassicEditor}
          data={addData}
          onChange={handleChange}
        />
        <div>{addedData ? parse(addData) : ""}</div>
      </div>
    </Container>
  );
};

export default Instructor;
