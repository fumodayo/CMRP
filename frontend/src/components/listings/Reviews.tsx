import { useState, useEffect } from "react";
import { reviews } from "../../utils/data.sample";
import Comment from "./Comment";
import { Review } from "../../types";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);

  useEffect(() => {
    setReviewsData(reviews);
  }, []);

  return (
    <div className="space-y-5 p-3 max-h-[500px] overflow-auto">
      {reviewsData.map((item) => (
        <Comment
          user_name={item.user_name}
          avatar={item.avatar}
          rating={item.rating}
          createdAt={item.createdAt}
          comment={item.comment}
        />
      ))}
    </div>
  );
};

export default Reviews;
