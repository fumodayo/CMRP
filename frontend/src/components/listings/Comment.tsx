import { Rating } from "@mui/material";

interface CommentProps {
  name?: string;
  avatar?: string;
  rating: number;
  time?: string;
  content?: string;
}

const Comment: React.FC<CommentProps> = ({
  name,
  avatar,
  rating,
  time,
  content,
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
          <h3 className="text-slate-700 font-semibold">{name}</h3>
          <div className="flex items-center space-x-2 text-slate-400">
            <span className="text-slate-700 font-medium">{rating}</span>
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.1}
              readOnly
            />
            <span>|</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
      <p className="text-slate-700 font-medium">{content}</p>
    </div>
  );
};

export default Comment;
