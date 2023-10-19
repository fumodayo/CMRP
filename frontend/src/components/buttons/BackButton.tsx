import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)}
      className="flex items-center w-full text-slate-700 font-medium hover:underline cursor-pointer"
    >
      <IoChevronBackOutline className="mr-2" size={20} />
      Quay lại
    </div>
  );
};

export default BackButton;
