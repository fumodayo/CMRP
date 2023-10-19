import { Courses } from "../../models/courses";
import CourseCard from "./CourseCard";

const SimilarCourses = () => {
  return (
    <div className="flex justify-between py-5">
      {Courses.slice(0, 3).map((item) => (
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
  );
};

export default SimilarCourses;
