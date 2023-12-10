import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Tab } from "@headlessui/react";
import { Rating } from "@mui/material";
import YouTube from "react-youtube";

import UserLayout from "../layouts/UserLayout";
import Container from "../components/Container";

import Detail from "../components/listings/Detail";
import BackButton from "../components/buttons/BackButton";
import SimilarCourses from "../components/listings/SimilarCourses";
import Reviews from "../components/listings/Reviews";

import { countdownDaysToEvent } from "../utils/countdownDaysToEvent";
import { formatPrice } from "../utils/formatPrice";
import { Store } from "../context/Store";
import { formatDate } from "../utils/formatDate";

import { CartItem, Course } from "../types";
import axios from "axios";
import Schedule from "../components/listings/Schedule";
import toast from "react-hot-toast";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const DetailCourse = () => {
  const params = useParams();
  const navigator = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store) || "{}";
  const {
    cart: { cartItems },
    userInfo,
  } = state;

  const [isShowTitle, setShowTitle] = useState(true);

  const headerTabs = ["Nội dung", "Đánh giá", "Lịch học"];

  const [courseData, setCourseData] = useState<Course | null>(null);

  useEffect(() => {
    const { id } = params;
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/course/${id}`
      );
      setCourseData(data);
    };
    fetchData();
  }, [params]);

  const [status, setStatus] = useState("");

  useEffect(() => {
    const { id } = params;

    if (id) {
      const checkIfCourseInCart = (id: string, course_Ids: any) => {
        return course_Ids.includes(id);
      };

      const checkIfCourseInCourseOfUser = (id: string, courses: any) => {
        return courses.some((course) => course.id === id);
      };

      if (checkIfCourseInCart(id, userInfo.course_Ids)) {
        setStatus("IN_COURSE");
      } else if (checkIfCourseInCourseOfUser(id, cartItems)) {
        setStatus("IN_CART");
      }
    }
  }, [cartItems, userInfo]);

  if (!courseData) {
    return null;
  }

  const {
    _id,
    name,
    author,
    author_image,
    image,
    thumbnail,
    price,
    createdAt,
    startDate,
    endDate,
    type,
    address,
    short_description,
    description,
    requirement,
    schedule,
    user_id,
    total_rating,
    total_review,
    total_student,
    total_lesson,
    total_enroll,
  } = courseData;

  const addToCartHandler = () => {
    const courseItem: CartItem = {
      _id: _id,
      image: image,
      endDate: endDate,
      name: name,
      author: author,
      type: type,
      rating: total_rating,
      total_student: total_student,
      price: price,
    };
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...courseItem },
    });
    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <UserLayout>
      <Container>
        <BackButton />
        <section className="mx-6 py-5">
          <div className="flex space-x-5 pt-6 pb-10">
            <div className="w-1/2 space-y-5">
              <h1 className="text-slate-700 text-4xl font-bold">
                {name} - {author}
              </h1>
              <p className="text-zinc-400">{short_description}</p>
              <div className="text-zinc-400 flex space-x-3 items-center">
                <div className="text-slate-700 font-medium">{total_rating}</div>
                <Rating
                  name="half-rating-read"
                  defaultValue={total_rating}
                  precision={0.1}
                  readOnly
                />
                <span>|</span>
                <div>
                  {total_enroll}/{total_student} Học viên
                </div>
              </div>
              <div className="flex space-x-3 items-center">
                <div className="relative w-[45px] h-[35px] ">
                  <img
                    className="relative w-[45px] h-[35px] rounded-md object-cover"
                    src={author_image}
                    alt="author"
                  />
                </div>
                <span className="text-zinc-400">{author}</span>
                <span>|</span>
                <span
                  onClick={() => navigator(`/review/${user_id}`)}
                  className="text-zinc-400 hover:underline cursor-pointer"
                >
                  Review ({total_review})
                </span>
              </div>
              <Tab.Group>
                <Tab.List className="flex w-full border-b-2 border-zinc-300">
                  {headerTabs.map((item) => (
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-1/5 font-semibold p-2",
                          selected
                            ? "text-emerald-400 border-b-2 border-emerald-400"
                            : "text-zinc-400"
                        )
                      }
                    >
                      {item}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    {description && (
                      <Detail
                        description={description}
                        requirement={requirement}
                      />
                    )}
                  </Tab.Panel>
                  <Tab.Panel>
                    <Reviews />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Schedule
                      schedule={[
                        {
                          id: "31082",
                          title: "Class A",
                          start: "2023-08-02T00:00:00.000Z",
                          end: "2023-08-02T01:30:00.000Z",
                        },
                        {
                          id: "90154",
                          title: "Class A",
                          start: "2023-08-07T00:00:00.000Z",
                          end: "2023-08-07T01:30:00.000Z",
                        },
                        {
                          id: "76424",
                          title: "Class A",
                          start: "2023-08-09T00:00:00.000Z",
                          end: "2023-08-09T01:30:00.000Z",
                        },
                        {
                          id: "98535",
                          title: "Class A",
                          start: "2023-08-14T00:00:00.000Z",
                          end: "2023-08-14T01:30:00.000Z",
                        },
                        {
                          id: "22176",
                          title: "Class A",
                          start: "2023-08-16T00:00:00.000Z",
                          end: "2023-08-16T01:30:00.000Z",
                        },
                        {
                          id: "22422",
                          title: "Class A",
                          start: "2023-08-21T00:00:00.000Z",
                          end: "2023-08-21T01:30:00.000Z",
                        },
                        {
                          id: "68145",
                          title: "Class A",
                          start: "2023-08-23T00:00:00.000Z",
                          end: "2023-08-23T01:30:00.000Z",
                        },
                        {
                          id: "20796",
                          title: "Class A Created",
                          start: "2023-08-28T01:30:00.000Z",
                          end: "2023-08-28T03:00:00.000Z",
                        },
                        {
                          id: "28559",
                          title: "Class A Updated",
                          start: "2023-08-30T05:00:00.000Z",
                          end: "2023-08-30T06:30:00.000Z",
                        },
                      ]}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="w-1/2 flex flex-col justify-between rounded-xl border-dashed border-2 border-emerald-200 pt-10 pb-3 px-5 items-center">
              <div className="space-y-5">
                <div className="relative">
                  <YouTube
                    iframeClassName="relative rounded-2xl w-[500px] h-[300px]"
                    videoId={thumbnail?.split("=").pop()}
                    onPlay={() => setShowTitle(false)}
                    onPause={() => setShowTitle(true)}
                  />
                  {isShowTitle && (
                    <div className="absolute bottom-0 rounded-bl-xl rounded-tr-xl bg-red-500 px-6 py-4 text-sm text-white">
                      {countdownDaysToEvent(startDate)}
                    </div>
                  )}
                </div>
                <h2 className="text-3xl text-slate-700 font-bold">
                  {price && formatPrice(price)}
                  <span className="text-emerald-400">đ</span>
                </h2>
                <div className="space-y-3">
                  <h3 className="font-medium text-zinc-500 text-lg flex space-x-3">
                    <div className="flex items-center justify-center">
                      <AiFillStar className="mr-1 text-emerald-400" />
                      Offline
                    </div>
                    <span>|</span>
                    <div>{total_lesson} bài học</div>
                    {address && address.name && (
                      <>
                        <span>|</span>
                        <div className="flex items-center justify-center hover:underline cursor-pointer">
                          <FaMapMarkerAlt className="mr-1 text-emerald-400" />
                          <a
                            href={`https://www.google.com/maps/place/${address.lat},${address.lng}`}
                          >
                            {address.name}
                          </a>
                        </div>
                      </>
                    )}
                  </h3>
                </div>
                <div className="flex space-x-3">
                  <h3 className="font-medium text-slate-700 text-lg">
                    Thời gian:
                  </h3>
                  <div className=" text-slate-700 text-sm space-y-5 pt-1">
                    <p>
                      Ngày bắt đầu học theo lộ trình: {formatDate(startDate)}
                    </p>
                    <p>
                      Ngày bắt đầu đăng kí: {formatDate(createdAt)} - Hạn:
                      {formatDate(startDate)}
                    </p>
                    <p>Ngày bế giảng: {formatDate(endDate)}</p>
                  </div>
                </div>
              </div>
              {status === "IN_COURSE" ? (
                <h1 className="font-medium text-emerald-400 text-lg">
                  Bạn đang học khóa học này
                </h1>
              ) : (
                <div className="flex space-x-5 py-5">
                  {status !== "IN_CART" && (
                    <div
                      onClick={addToCartHandler}
                      className="min-w-[250px] flex items-center justify-center text-lg rounded-xl ring-2 ring-emerald-200 px-5 py-3 hover:shadow-md cursor-pointer "
                    >
                      Thêm vào giỏ
                    </div>
                  )}
                  <div
                    onClick={() => {
                      addToCartHandler();
                      navigator("/checkout");
                    }}
                    className="min-w-[250px] flex items-center justify-center text-lg rounded-xl px-5 py-3 hover:shadow-md cursor-pointer bg-emerald-500 text-white"
                  >
                    Mua ngay
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-neutral-700 text-lg font-semibold">
              Các khóa học liên quan:
            </h1>
            <SimilarCourses id={_id} />
          </div>
        </section>
      </Container>
    </UserLayout>
  );
};

export default DetailCourse;
