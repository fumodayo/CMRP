import { useState, useEffect, useContext } from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../types";
import axios from "axios";
import { Store } from "../../context/Store";

interface SimilarCourseProps {
  id?: string;
}

const SimilarCourses: React.FC<SimilarCourseProps> = ({ id }) => {
  const [coursesData, setCoursesData] = useState<Course[] | null>(null);
  const { state, dispatch: ctxDispatch } = useContext(Store) || {};
  const { cart, userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      let Ids: string[] = [];
      if (id) {
        Ids.push(id);
      } else if (cart && cart.cartItems && cart.cartItems.length > 0) {
        Ids = cart.cartItems.map((item: any) => item._id);
      }

      if (Ids.length > 0) {
        const { data } = await axios.post(
          "http://localhost:8080/api/course/similar",
          { _id: Ids }
        );
        setCoursesData(data);
      }
    };

    fetchData();
  }, [id, cart]);

  return (
    <div className="flex justify-between py-5">
      {coursesData &&
        coursesData.map((item) => (
          <CourseCard
            key={item._id}
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
