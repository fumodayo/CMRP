import { Rating } from "@mui/material";
import UserLayout from "../layouts/UserLayout";
import BackButton from "../components/buttons/BackButton";
import Chip from "../components/listings/Chip";
import { AiFillStar } from "react-icons/ai";
import Container from "../components/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Comment from "../components/listings/Comment";
import Chart from "../components/listings/Chart";
import { calculateAverageRating } from "../utils/calculateAverageRating";

const Review = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [reviewsData, setReviewsData] = useState({
    avatar: "",
    name: "",
    category: [],
    courses: [],
    certificates: [],
  });
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const { id } = params;
    const typeParam = type || "all";
    const ratingParam = rating || "all";
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/review/author/${id}/${typeParam}/${ratingParam}`
      );
      setReviewsData(data);
    };
    fetchData();
  }, [params, rating, type]);

  console.log(reviewsData);

  const averageRating = useMemo(() => {
    let totalRating = 0;
    let totalReviews = 0;
    if (reviewsData && reviewsData.courses) {
      reviewsData?.courses.forEach((course) => {
        if (course.reviews && course.reviews.length > 0) {
          course.reviews.forEach((review) => {
            totalRating += review.rating;
            totalReviews++;
          });
        }
      });
    }

    return totalReviews > 0 ? totalRating / totalReviews : 0;
  }, [reviewsData]);

  const sentimentRating = useMemo(() => {
    const sentimentValues = {
      "Tiêu cực": 0,
      "Tích cực": 0,
      "Trung lập": 0,
    };

    reviewsData?.courses.forEach((course) => {
      course.reviews.forEach((review) => {
        const [negative, positive, neutral] = review.sentiment;
        if (negative > positive && negative > neutral) {
          sentimentValues["Tiêu cực"]++;
        } else if (positive > negative && positive > neutral) {
          sentimentValues["Tích cực"]++;
        } else {
          sentimentValues["Trung lập"]++;
        }
      });
    });

    return Object.entries(sentimentValues).map(([name, value]) => ({
      name,
      value,
    }));
  }, [reviewsData]);

  // console.log(sentimentRating);

  if (!reviewsData) {
    return null;
  }

  const { category, name, courses, certificates } = reviewsData;

  const rangeStars = [
    {
      name: "5 Sao",
      value: 5,
    },
    {
      name: "4 Sao",
      value: 4,
    },
    {
      name: "3 Sao",
      value: 3,
    },
    {
      name: "2 Sao",
      value: 2,
    },
    {
      name: "1 Sao",
      value: 1,
    },
  ];

  const handleTypeChange = (item: string) => {
    setType(item);
  };

  const handleRatingChange = (item: string) => {
    setRating(item);
  };

  return (
    <UserLayout>
      <Container>
        <BackButton />
        <section className="space-y-5">
          <div className="flex justify-between">
            <h1>
              Đánh giá của <span className="font-medium">{name}</span>
            </h1>
            <div className="w-[800px]">
              <Chart sentimentRating={sentimentRating} />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <p>Các lĩnh vực đào tạo</p>
            <div className="flex space-x-2">
              {category && (
                <Chip
                  certificate={certificates}
                  types={category}
                  currentType={type}
                  onCurrentType={handleTypeChange}
                />
              )}
            </div>
          </div>
          <div className="flex bg-zinc-200 px-7 py-5 space-x-5">
            <div className="flex flex-col items-center">
              <p className="text-xl font-medium">
                <span className="text-4xl">{averageRating}</span> trên 5
              </p>
              <Rating
                name="half-rating-read"
                size="large"
                defaultValue={0}
                value={averageRating}
                precision={0.1}
                readOnly
              />
            </div>
            <div className="flex space-x-2 py-5">
              <Chip
                types={rangeStars}
                currentType={rating}
                onCurrentType={handleRatingChange}
              />
            </div>
          </div>
          {courses &&
            courses.map((course: any) => (
              <div key={course._id}>
                <div
                  className="flex space-x-5 items-center hover:bg-zinc-200 px-5 py-3 rounded-xl cursor-pointer"
                  onClick={() =>
                    navigate(`/course/${course._id}`, {
                      state: "WATCH ONLY",
                    })
                  }
                >
                  <div className="relative h-[140px]">
                    <img
                      className="relative h-[140px] rounded-xl object-cover"
                      src={course.image}
                      alt="course"
                    />
                    <div className="absolute bottom-0 rounded-bl-xl bg-red-500 px-3 py-1 text-sm text-white">
                      Khóa học kết thúc
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-700">
                      {course.name}
                    </h2>
                    <div className="text-zinc-400 text-sm font-normal">
                      {course.author}
                    </div>
                    <div className="text-zinc-400 text-sm font-semibold">
                      {course.type}
                    </div>
                    <div className="flex text-center text-zinc-400 text-sm font-normal space-x-3">
                      {calculateAverageRating(course.reviews)}
                      <AiFillStar className="text-yellow-400 mx-1" size={15} />|
                      <span>{course.total_student} Học viên</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {course.reviews.map((review) => (
                    <Comment
                      key={review._id}
                      avatar={review.avatar}
                      name={review.author}
                      rating={review.rating}
                      createdAt={review.createdAt}
                      content={review.content}
                    />
                  ))}
                </div>
              </div>
            ))}
        </section>
      </Container>
    </UserLayout>
  );
};

export default Review;
