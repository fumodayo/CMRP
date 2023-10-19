
import UserLayout from "../layouts/UserLayout";
import Chip from "../components/listings/Chip";
import { Courses } from "../models/courses";
import CourseCard from "../components/listings/CourseCard";
import Pagination from "../components/Pagination";
import Container from "../components/Container";

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
  const type = [
    {
      name: "Lập trình",
      active: true,
    },
    {
      name: "Thiết kế",
      active: false,
    },
    {
      name: "Âm nhạc",
      active: false,
    },
    {
      name: "Nhiếp ảnh",
      active: false,
    },
    {
      name: "Phát triển bản thân",
      active: false,
    },
  ];

  const fields = [
    {
      name: "Phổ biến",
      active: true,
    },
    {
      name: "Mới",
      active: false,
    },
    {
      name: "Trending",
      active: false,
    },
  ];

  const handlePageChange = (currentPage: number) => {
    console.log(currentPage);
  };

  return (
    <UserLayout>
      <Container>
        <section>
          <h1 className="text-slate-700 text-2xl font-bold my-3">
            Các lĩnh vực đang hot
          </h1>
          <div className="flex space-x-2">
            {type.map((item) => (
              <Chip key={item.name} name={item.name} active={item.active} />
            ))}
          </div>
        </section>
        <section className="py-5">
          <div className="space-x-5 text-lg font-medium py-2 cursor-pointer">
            {fields.map((item) => (
              <CourseField name={item.name} active={item.active} />
            ))}
          </div>
          <hr className="w-full border" />
          <div className="py-5 grid grid-cols-4 grid-flow-row gap-5">
            {Courses.map((item) => (
              <CourseCard
                image={item.image}
                time={item.time}
                name={item.name}
                type={item.type}
                author={item.author}
                rating={item.rating}
                price={item.price}
                total_student={item.total_student}
              />
            ))}
          </div>
        </section>
        <Pagination totalPage={5} onCurrentPage={handlePageChange} />
      </Container>
    </UserLayout>
  );
};

export default Home;
