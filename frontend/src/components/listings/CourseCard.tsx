import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { formatPrice } from "../../utils/formatPrice";
import { countdownDaysToEvent } from "../../utils/countdownDaysToEvent";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

interface CourseCardProps {
  id?: string;
  image?: string;
  endDate?: string;
  name?: string;
  type?: string;
  author?: string;
  total_rating?: number;
  price?: number;
  total_student?: number;
  isCertificate?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  image,
  endDate,
  name,
  type,
  author,
  total_rating,
  price,
  total_student,
  isCertificate,
}) => {
  const navigator = useNavigate();

  return (
    <div className="max-h-[320px] px-3 pt-3 pb-2 w-[320px] bg-white/20 rounded-xl ring-1 ring-gray-200 shadow hover:translate-y-1 hover:shadow-lg cursor-pointer">
      <div className="relative w-full h-[160px]">
        {image && (
          <img
            className="relative h-[160px] rounded-xl object-cover"
            src={image}
            alt="course"
          />
        )}
        <div className="absolute bottom-0 rounded-bl-xl bg-red-500 px-3 py-1 text-sm text-white">
          {endDate && countdownDaysToEvent(endDate)}
        </div>
      </div>
      <div className="pt-5 pb-3">
        <div className="flex justify-between items-end">
          <div className="text-slate-700 text-xl font-bold">{name}</div>
          <div className="text-zinc-400 text-sm font-bold">{type}</div>
        </div>
        <div className="flex justify-between items-end pb-1">
          <div className="text-zinc-400 text-sm font-normal">
            {author}
            {isCertificate && (
              <VerifiedUserIcon fontSize="small" className="ml-1 text-emerald-500" />
            )}
          </div>
          <div className="flex items-center text-zinc-400 text-sm font-normal justify-center space-x-3">
            {total_rating}
            <AiFillStar className="text-yellow-400 mx-1" size={15} />|
            <span>{total_student} học viên</span>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-slate-700 text-xl font-bold">
            {price && formatPrice(price)}
            <span className="text-emerald-500 ml-1">đ</span>
          </div>
          <div
            onClick={() => {
              navigator(`/course/${id}`);
              window.scrollTo(0, 0);
            }}
            className="text-emerald-400 text-sm font-normal cursor-pointer hover:underline"
          >
            Xem chi tiết
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
