import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { HiBell } from "react-icons/hi2";
import { MdSettings } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Container from "../Container";

const Navbar = () => {
  const isHaveUser = false;
  const navigate = useNavigate();

  return (
    <nav className="sticky z-50 top-0 bg-white h-[80px] w-full border border-b-slate-100 shadow-sm">
      <Container>
        <ul className="flex items-center justify-between my-5">
          <li
            onClick={() => navigate("/")}
            className="text-slate-700 text-4xl font-bold"
          >
            Logo.
          </li>
          <li>
            <div className="rounded-xl ring-1 ring-gray-200 px-3 py-1 hover:shadow-md cursor-pointer">
              Các lĩnh vực
            </div>
          </li>
          <li>
            <div className="w-[520px] h-[40px] pl-6 pr-8 py-3 bg-neutral-100 rounded-2xl justify-start items-center gap-2 inline-flex">
              <BiSearch className="text-emerald-400" size={25} />
              <input
                className="bg-neutral-100 text-zinc-400 text-sm font-normal appearance-none focus:outline-none"
                placeholder="Tìm kiếm khóa học..."
              />
            </div>
          </li>

          {isHaveUser ? (
            <li className="flex justify-between items-center space-x-5">
              <div className="relative">
                <HiBell className="relative text-zinc-400" size={25} />
                <div className="w-[6px] h-[6px] rounded-xl right-0 top-0 absolute bg-emerald-500" />
              </div>
              <div>
                <MdSettings className="text-zinc-400" size={25} />
              </div>
              {/* USER PROFILE */}
              <div className="w-[40px] h-[40px] bg-zinc-300 rounded-2xl" />
            </li>
          ) : (
            <li className="flex space-x-10 items-center justify-between">
              <div className="flex space-x-10 items-center">
                <div className="rounded-xl ring-1 ring-gray-200 px-3 py-1 hover:shadow-md cursor-pointer">
                  Mở khóa học mới
                </div>
                <AiOutlineShoppingCart
                  onClick={() => navigate("/cart")}
                  className="cursor-pointer"
                  size={22}
                />
              </div>
              <div className="flex space-x-2">
                <div
                  onClick={() => navigate("/signin")}
                  className="rounded-md ring-1 ring-emerald-400 px-3 py-1 hover:shadow-md cursor-pointer "
                >
                  Đăng nhập
                </div>
                <div
                  onClick={() => navigate("/signup")}
                  className="rounded-md ring-1 ring-gray-200 px-3 py-1 hover:shadow-md cursor-pointer bg-emerald-400 text-white"
                >
                  Đăng ký
                </div>
              </div>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
