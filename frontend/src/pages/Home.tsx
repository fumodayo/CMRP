import UserLayout from "../layouts/UserLayout";
import Chip from "../components/listings/Chip";
import CourseCard from "../components/listings/CourseCard";
import Pagination from "../components/Pagination";
import Container from "../components/Container";
import { useEffect, useState, useContext } from "react";
import { Category, Course } from "../types";
import axios from "axios";
import { Store } from "../context/Store";

interface CourseField {
  name: string;
  active?: boolean;
}

export const CourseField: React.FC<CourseField> = ({ name, active }) => {
  return (
    <span
      className={`${
        active ? "bg-emerald-400 text-white" : "text-slate-700"
      } px-4 py-2 min-w-[200px]`}
    >
      {name}
    </span>
  );
};

const Home = () => {
  const [coursesData, setCourseData] = useState<Course[]>([]);
  const [categoriesData, setCategoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [currentType, setCurrentType] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { search } = state;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/category`);
      setCategoryData(data);
    };
    fetchData();
  }, []);

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const handleTypeChange = (item: string) => {
    console.log(item);
    setCurrentType(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/course?type=${currentType}&page=${currentPage}&search=${search}`
      );
      const { courses, page, pages } = data;
      setCourseData(courses);
      setPageSize(pages);
      setCurrentPage(page);
    };
    fetchData();
  }, [currentPage, currentType, search]);

  return (
    <UserLayout>
      <Container>
        <section>
          <h1 className="text-slate-700 text-2xl font-bold my-3">
            Các lĩnh vực đang hot
          </h1>
          <div className="flex space-x-2">
            {categoriesData && (
              <Chip
                types={categoriesData}
                currentType={currentType}
                onCurrentType={handleTypeChange}
              />
            )}
          </div>
        </section>
        <section className="py-5">
          <div className="min-h-[500px] py-5 grid grid-cols-4 grid-flow-row gap-5">
            {coursesData.map((item) => (
              <CourseCard
                id={item._id}
                image={item.image}
                endDate={item.endDate}
                name={item.name}
                type={item.type}
                author={item.author}
                total_rating={item.total_rating}
                price={item.price}
                total_student={item.total_student}
              />
            ))}
          </div>
        </section>
        <Pagination
          currentPage={Number(currentPage)}
          totalPage={pageSize}
          onCurrentPage={handlePageChange}
        />
      </Container>
    </UserLayout>
  );
};

export default Home;
