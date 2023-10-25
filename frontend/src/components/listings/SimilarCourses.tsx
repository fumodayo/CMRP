import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../types";
import axios from "axios";
import { courses } from "../../utils/data.sample";

const SimilarCourses = () => {
  const [coursesData, setCoursesData] = useState<Course[]>(courses);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8080/api/course");
      const { courses } = data;
      setCoursesData(courses);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-between py-5">
      {coursesData.slice(0, 4).map((item) => (
        <CourseCard
          id={item._id}
          image={item.image}
          endDate={item.endDate}
          name={item.name}
          location={item.location}
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
