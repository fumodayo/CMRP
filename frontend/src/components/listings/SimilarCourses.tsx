import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../types";
import axios from "axios";

const SimilarCourses = ({ id }) => {
  const [coursesData, setCoursesData] = useState<Course[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(
        "http://localhost:8080/api/course/similar",
        { _id: id }
      );
      setCoursesData(data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex justify-between py-5">
      {coursesData &&
        coursesData.map((item) => (
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
  );
};

export default SimilarCourses;
