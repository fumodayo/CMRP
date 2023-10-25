import { Rating } from "@mui/material";
import { formatDate } from "../../utils/formatDate";

interface CommentProps {
  user_name?: string;
  avatar?: string;
  rating: number;
  createdAt?: string;
  comment?: string;
}

const Comment: React.FC<CommentProps> = ({
  user_name,
  avatar,
  rating,
  createdAt,
  comment,
}) => {
  return (
    <div className="space-y-5 ring-2 ring-emerald-200 p-5 shadow-xl rounded-xl">
      <div className="flex">
        <div className="relative mr-5">
          {avatar && (
            <img
              style={{ objectFit: "cover" }}
              className="relative w-10 h-10 rounded-xl object-cover"
              src={avatar}
              alt="avatar"
            />
          )}
        </div>
        <div>
          <h3 className="text-slate-700 font-semibold">{user_name}</h3>
          <div className="flex items-center space-x-2 text-slate-400">
            <span className="text-slate-700 font-medium">{rating}</span>
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.1}
              readOnly
            />
            <span>|</span>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
      <p className="text-slate-700 font-medium">{comment}</p>
    </div>
  );
};

export default Comment;
