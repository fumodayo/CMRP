import { useState, useEffect } from "react";
import Comment from "./Comment";
import { Review } from "../../types";
import axios from "axios";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    const { id } = params;
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/review/${id}`
      );
      setReviews(data);
    };
    fetchData();
  }, [params]);

  return (
    <div className="space-y-5 p-3 max-h-[500px] overflow-auto">
      {reviews &&
        reviews.map((item) => (
          <Comment
            avatar={item.avatar}
            name={item.name}
            rating={item.rating}
            createdAt={item.createdAt}
            content={item.content}
          />
        ))}
    </div>
  );
};

export default Reviews;
