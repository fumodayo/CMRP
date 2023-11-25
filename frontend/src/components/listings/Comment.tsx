import { Rating } from "@mui/material";
import { convertDateTime } from "../../utils/convertDateTime";

interface CommentProps {
  avatar?: string;
  name?: string;
  rating?: number;
  createdAt?: string;
  content?: string;
  isUnnamed?: boolean;
}

const Comment: React.FC<CommentProps> = ({
  avatar,
  name,
  rating,
  createdAt,
  content,
  isUnnamed,
}) => {
  return (
    <div className="space-y-3 py-3 border-b border-stone-300">
      <div className="flex items-center">
        <div className="relative mr-2">
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
          <h3 className="text-slate-700 font-semibold">
            {isUnnamed ? "Đánh giá ẩn danh" : name}
          </h3>
          <div className="flex items-center space-x-2 text-slate-400">
            <Rating
              size="small"
              name="half-rating-read"
              defaultValue={rating}
              precision={0.1}
              readOnly
            />
            <span>|</span>
            <span>{convertDateTime(createdAt)}</span>
          </div>
        </div>
      </div>
      <p className="text-slate-700 font-medium">{content}</p>
    </div>
  );
};

export default Comment;
