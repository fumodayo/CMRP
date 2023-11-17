import { Rating } from "@mui/material";
import UserLayout from "../layouts/UserLayout";
import BackButton from "../components/buttons/BackButton";
import Chip from "../components/listings/Chip";
import { AiFillStar } from "react-icons/ai";
import Comment from "../components/listings/Comment";
import { convertDateTime } from "../utils/convertDateTime";
import Container from "../components/Container";

const comments = [
  {
    id: "comment_1",
    user_name: "Nguyễn Duy",
    avatar: "/images/avatar.png",
    rating: 5,
    createdAt: "2023-02-16T18:32:00.000Z",
    comment: "Thầy dạy dễ hiểu, hấp dẫn",
  },
  {
    id: "comment_2",
    user_name: "Thái Thùy Trinh",
    avatar: "/images/avatar.png",
    rating: 4,
    createdAt: "2023-02-16T18:32:00.000Z",
    comment: "Từ khi học thầy mình không còn sợ hóa nữa",
  },
  {
    id: "comment_3",
    user_name: "Thái Thùy Trinh",
    avatar: "/images/avatar.png",
    rating: 4,
    createdAt: "2023-02-16T18:32:00.000Z",
    comment: "Từ khi học thầy mình không còn sợ hóa nữa",
  },
  {
    id: "comment_4",
    hidden: true,
    user_name: "Thái Thùy Trinh",
    avatar: "/images/avatar.png",
    rating: 4,
    createdAt: "2023-02-16T18:32:00.000Z",
    comment: "Từ khi học thầy mình không còn sợ hóa nữa",
  },
];

const authors = [
  {
    name: "Thầy Vũ Khắc Ngọc",
    firstTime: "2023-02-16T18:32:00.000Z",
    major: ["Vẽ", "Phát triển bản thân"],
    rating: 4.9,
    courseIds: ["course_1", "course_2"],
  },
];

const courses = [
  {
    id: "course_1",
    name: "Hóa học cơ bản",
    author: "Thầy Vũ Khắc Ngọc",
    location: "Online",
    rating: 5,
    total_student: 23,
    commentIds: ["comment_1", "comment_2"],
  },
];

const Review = () => {
  const rangeStars = [
    {
      name: "",
    },
    {
      name: "5 Sao",
    },
    {
      name: "4 Sao",
    },
    {
      name: "3 Sao",
    },
    {
      name: "2 Sao",
    },
    {
      name: "1 Sao",
    },
  ];

  const handleTypeChange = (item: string) => {
    console.log(item);
  };

  const author = authors[0];

  return (
    <UserLayout>
      <Container>
        <BackButton />
        <section className="space-y-5">
          <div className="flex justify-between">
            <h1>
              Đánh giá <span>{author.name}</span>
            </h1>
            <p>Tạo khóa học đầu tiên từ {convertDateTime(author.firstTime)}</p>
          </div>
          <div className="flex items-center space-x-3">
            <p>Các lĩnh vực đào tạo</p>
            <div className="flex space-x-2">
              {author.major.map((item) => (
                <Chip
                  square
                  key={item}
                  name={item}
                  onCurrentType={handleTypeChange}
                />
              ))}
            </div>
          </div>
          <div className="flex bg-zinc-200 px-7 py-5 space-x-5">
            <div className="flex flex-col items-center">
              <p className="text-xl font-medium">
                <span className="text-4xl">4.9</span> trên 5
              </p>
              <Rating
                name="half-rating-read"
                size="large"
                defaultValue={4.9}
                precision={0.1}
                readOnly
              />
            </div>
            <div className="flex space-x-2 py-5">
              {rangeStars.map((item) => (
                <Chip
                  square
                  key={item.name}
                  name={item.name}
                  onCurrentType={handleTypeChange}
                />
              ))}
            </div>
          </div>
          <div>
            <div>
              <div className="flex space-x-5 items-center">
                <div className="relative h-[140px]">
                  <img
                    className="relative h-[140px] rounded-xl object-cover"
                    src="https://i.ytimg.com/vi/js0AUKZShAs/maxresdefault.jpg"
                    alt="course"
                  />
                  <div className="absolute bottom-0 rounded-bl-xl bg-red-500 px-3 py-1 text-sm text-white">
                    Khóa học kết thúc
                  </div>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-700">
                    Hóa học cơ bản
                  </h2>
                  <div className="text-zinc-400 text-sm font-normal">
                    Thầy Vũ Khắc Ngọc
                  </div>
                  <div className="text-zinc-400 text-sm font-semibold">
                    Online
                  </div>
                  <div className="flex text-center text-zinc-400 text-sm font-normal space-x-3">
                    5.0
                    <AiFillStar className="text-yellow-400 mx-1" size={15} />|
                    <span>23 Học viên</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {comments.map((item) => (
                  <Comment
                    hidden={item.hidden}
                    user_name={item.user_name}
                    avatar={item.avatar}
                    rating={item.rating}
                    createdAt={item.createdAt}
                    comment={item.comment}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </UserLayout>
  );
};

export default Review;
