import { AiFillStar } from "react-icons/ai";
import BackButton from "../../components/buttons/BackButton";
import Container from "../../components/Container";
import UserLayout from "../../layouts/UserLayout";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import History from "../../components/listings/History";
import Helper from "../../components/listings/Helper";
import ReviewHistory from "../../components/listings/ReviewHistory";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface CourseItemProps {
  image?: string;
  name?: string;
  author?: string;
  type?: string;
  rating?: number;
  total_students?: number;
  time?: string;
}

export const CourseItem: React.FC<CourseItemProps> = ({
  image,
  name,
  author,
  type,
  rating,
  total_students,
  time,
}) => {
  const [status, setStatus] = useState(false);
  const [daysCountdown, setDaysCountdown] = useState(0);

  useEffect(() => {
    if (time) {
      const currentDate = new Date();
      const startDateTime = new Date(time);

      const timeDiff = startDateTime.getTime() - currentDate.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysRemaining > 0) {
        setStatus(false);
        setDaysCountdown(daysRemaining);
      } else {
        setStatus(true);
      }
    }
  }, [time]);

  return (
    <div className="flex items-center cursor-pointer">
      <div className="grid grid-cols-4 grid-flow-row gap-6 hover:bg-neutral-100 p-5 rounded-xl">
        <div className="relative w-full h-[160px]">
          {image && (
            <img
              className="relative h-[160px] rounded-xl object-cover"
              src={image}
              alt="course"
            />
          )}
        </div>
        <div className="flex flex-col justify-center space-y-1">
          <h2 className="min-w-[300px] text-2xl font-semibold text-neutral-900">
            {name}
          </h2>
          <div className="text-zinc-400 text-sm font-normal">{author}</div>
          <div className="text-zinc-400 text-sm font-semibold">{type}</div>
          <div className="flex items-center text-zinc-400 text-sm font-normal space-x-3">
            {rating}
            <AiFillStar className="text-yellow-400 mx-1" size={15} />|
            <span>{total_students}</span>
          </div>
        </div>
        <span className="flex items-center justify-start font-medium hover:underline">
          {status ? "Đang học" : `Còn ${daysCountdown} ngày nữa khai giảng`}
        </span>
        <span className="flex items-center justify-start text-red-500 font-medium hover:underline">
          {status ? "Yêu cầu trợ giúp" : "Hủy"}
        </span>
      </div>
    </div>
  );
};

const Profile = () => {
  const headerTabs = [
    "Lịch sử thanh toán",
    "Yêu cầu trợ giúp",
    "Review của tôi",
  ];

  return (
    <UserLayout>
      <Container>
        <BackButton />
        <div className="flex space-x-10 py-5">
          <div className="w-1/3">
            <div className="py-5 px-3 max-w-[300px] min-h-[500px] space-y-5 border border-neutral-300 rounded-xl shadow-md">
              <div className="flex flex-col items-center justify-center">
                <div className="text-xl font-semibold text-neutral-700">
                  Học viên
                </div>
                <img
                  className="relative h-[100px] w-[100px] rounded-xl object-cover mb-2"
                  src={"/images/avatar.png"}
                  alt="avatar"
                />
                <p className="text-lg font-medium text-neutral-700">Sơn Thái</p>
                <p className="text-sm font-medium text-neutral-500">
                  Id: 2838232
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-neutral-700">
                  Giới thiệu
                </p>
                <div className="min-h-[200px] bg-neutral-50 p-5 text-neutral-400">
                  Thú vị vui tính
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3">
            <h1 className="text-2xl text-neutral-900 font-semibold mb-2">
              Các khóa đang học
            </h1>
            <div className="flex flex-col space-y-5">
              <CourseItem
                image="/images/course.png"
                time="2023-10-12T00:00:00.000Z"
                name="Effective Developer"
                author="Ths. Lê Thanh Sang"
                type="Online"
                rating={4.2}
                total_students={27}
              />
            </div>
            <div>
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
                <Tab.Panels style={{ paddingTop: "20px" }}>
                  <Tab.Panel>
                    <History />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Helper />
                  </Tab.Panel>
                  <Tab.Panel>
                    <ReviewHistory />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </Container>
    </UserLayout>
  );
};

export default Profile;
