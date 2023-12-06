import { useState, useEffect, useContext, FormEvent } from "react";
import Comment from "./Comment";
import { Review } from "../../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Store } from "../../context/Store";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { convertToRating } from "../../utils/convertToRating";
import { Button } from "antd";

const Reviews = () => {
  const params = useParams();
  const { id } = params;
  const { state } = useContext(Store) || {};
  const { userInfo } = state || {};
  const { course_Ids = [], review_Ids = [], avatar = "" } = userInfo || {};

  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [isRating, setIsRating] = useState(false);
  const [comment, setComment] = useState("");
  const [point, setPoint] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/review/${id}`
      );
      setReviews(data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (course_Ids && review_Ids && course_Ids.includes(id) && reviews) {
      // Kiểm tra xem có _id trùng trong review_Ids không
      const hasSameId = reviews.some((review) =>
        review_Ids.includes(review._id)
      );

      // Nếu có _id trùng trong review_Ids, thiết lập isRating là false
      setIsRating(!hasSameId);
    } else {
      setIsRating(false);
    }
  }, [reviews, id, course_Ids, review_Ids]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = { sentence: comment };
    await axios
      .post(`http://localhost:5000/rating-comment`, body)
      .then(function (response) {
        setPoint(response.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
    

    console.log("comment", comment);
    console.log("rating", convertToRating(point));
  };

  return (
    <div className="space-y-5 p-3 max-h-[500px] overflow-auto">
      {isRating && (
        <div className="flex">
          {avatar && (
            <img
              style={{ objectFit: "cover" }}
              className="relative w-10 h-10 rounded-xl object-cover mr-2"
              src={avatar}
              alt="avatar"
            />
          )}
          <form className="flex" onSubmit={handleSubmit}>
            <TextareaAutosize
              className="w-80 text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0"
              placeholder="Hãy viết bình luận của bạn..."
              maxRows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button htmlType="submit">Đăng</Button>
          </form>
        </div>
      )}
      {reviews &&
        reviews.map((item) => (
          <Comment
            key={item._id}
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
