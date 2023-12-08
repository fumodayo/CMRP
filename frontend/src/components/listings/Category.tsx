import { useEffect, useState } from "react";
import MultiSelect from "../inputs/MultiSelect";
import axios from "axios";

interface CategoryProps {
  field?: any;
  onChange?: () => void;
}

const Category: React.FC<CategoryProps> = ({ field, onChange }) => {
  const [categoriesData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/category`);
      setCategoryData(data);
    };
    fetchData();
  }, []);

  return (
    <MultiSelect
      field={field}
      array={categoriesData}
      name="Thể loại"
      onMultiSelectChange={onChange}
    />
  );
};

export default Category;
