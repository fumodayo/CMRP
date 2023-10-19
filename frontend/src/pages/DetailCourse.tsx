import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const DetailCourse = () => {
  const params = useParams();
  // console.log(params);

  const [rating, setRating] = useState(3.5);
  const [isShowTitle, setShowTitle] = useState(true);

  const headerTabs = ["About", "Review"];
  const totalLesion = ["20 chuyên đề", "68 bài giảng", "Hơn 800 bài tập"];

  return (
    <UserLayout>
      <Container>
        <BackButton />
        <section className="mx-6 py-5">
          <div className="flex space-x-5 pt-6 pb-10">
            <div className="w-1/2 space-y-5">
              <h1 className="text-slate-700 text-4xl font-bold">
                Hoá học cơ bản - Thầy Vũ Khắc Ngọc
              </h1>
              <p className="text-zinc-400">
                Tham gia khóa PEN-I môn Hóa học của Thầy Vũ Khắc Ngọc, các em sẽ
                có những phương pháp làm đề thi tốt nghiệp THPT môn Hóa học hay
                nhất, giúp các em thành thạo mọi dạng bài thường gặp trong thi.
              </p>
              <div className="text-zinc-400 flex space-x-3 items-center">
                <div className="text-slate-700 font-medium">{rating}</div>
                <Rating
                  name="half-rating-read"
                  defaultValue={rating}
                  precision={0.1}
                  readOnly
                />
                <span>|</span>
                <div>Review (1K)</div>
                <span>|</span>
                <div>10k Học viên</div>
              </div>
              <div className="flex space-x-3 items-center">
                <div className="relative w-[45px] h-[35px] ">
                  <img
                    className="relative w-[45px] h-[35px] rounded-md object-cover"
                    src="/images/avatar.png"
                    alt="author"
                  />
                </div>
                <span className="text-zinc-400">Thầy Vũ Khắc Ngọc</span>
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
                    <Detail />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Reviews />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="w-1/2 flex flex-col justify-between rounded-xl border-dashed border-2 border-emerald-200 pt-10 pb-3 px-5 items-center">
              <div className="space-y-5">
                <div className="relative">
                  <YouTube
                    iframeClassName="relative rounded-2xl w-[500px] h-[300px]"
                    videoId={"9vJRopau0g0"}
                    onPlay={() => setShowTitle(false)}
                    onPause={() => setShowTitle(true)}
                  />
                  {isShowTitle && (
                    <div className="absolute bottom-0 rounded-bl-xl rounded-tr-xl bg-red-500 px-6 py-4 text-sm text-white">
                      {countdownDaysToEvent(
                        "Tue Oct 10 2023 21:55:12 GMT+0700"
                      )}
                    </div>
                  )}
                </div>
                <h2 className="text-3xl text-slate-700 font-bold">
                  {formatPrice(1000000)}
                  <span className="text-emerald-400">đ</span>
                </h2>
                <div className="space-y-3">
                  <h3 className="font-medium text-slate-700 text-lg">
                    What will you learn:
                  </h3>
                  {totalLesion.map((item) => (
                    <div className="flex text-slate-700 text-sm items-center">
                      <FaCheckCircle
                        className="text-emerald-400 mr-2"
                        size={20}
                      />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <h3 className="font-medium text-slate-700 text-lg">Time:</h3>
                  <div className=" text-slate-700 text-sm space-y-5 pt-1">
                    <p>Ngày bắt đầu học theo lộ trình: 6/12/2023</p>
                    <p>Ngày bắt đầu đăng kí: 8/10/2023 - Hạn: 20/11/2023</p>
                    <p>Ngày bế giảng: 31/8/2024</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-5 py-5">
                <div className="min-w-[250px] flex items-center justify-center text-lg rounded-xl ring-2 ring-emerald-200 px-5 py-3 hover:shadow-md cursor-pointer ">
                  Thêm vào giỏ
                </div>
                <div className="min-w-[250px] flex items-center justify-center text-lg rounded-xl px-5 py-3 hover:shadow-md cursor-pointer bg-emerald-500 text-white">
                  Mua ngay
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-neutral-700 text-lg font-semibold">
              Các khóa học liên quan:
            </h1>
            <SimilarCourses />
          </div>
        </section>
      </Container>
    </UserLayout>
  );
};

export default DetailCourse;
