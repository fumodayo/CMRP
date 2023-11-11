import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { HiBell } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext, useState } from "react";
import { Store } from "../../context/Store";
import axios from "axios";

const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store) || {};
  const { cart, userInfo } = state;
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
    ctxDispatch({
      type: "SEARCH",
      payload: e.target.value,
    });
  };

  const navigate = useNavigate();

  const signoutHandler = async () => {
    await axios.get("http://localhost:8080/api/auth/logout");
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("user_info");
    window.location.href = "/signin";
  };

  return (
    <nav className="sticky z-50 top-0 bg-white h-[80px] w-full border border-b-slate-100 shadow-sm cursor-pointer">
      <div className="mx-[90px] 2xl:mx-[280px] my-5">
        <ul className="flex items-center justify-between my-5 list-none">
          <li
            onClick={() => navigate("/")}
            className="flex items-center text-slate-700 text-sm font-bold"
          >
            <img
              className="relative h-[50px] w-[80px] rounded-xl object-cover mb-2"
              src={"/images/logo.png"}
              alt="avatar"
            />
            Course Marketplace <br /> Reviews Platform
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
                value={search}
                className="bg-neutral-100 text-zinc-400 text-sm font-normal appearance-none focus:outline-none"
                placeholder="Tìm kiếm khóa học..."
                onChange={handleSearchChange}
              />
            </div>
          </li>
          <li className="flex justify-between items-center space-x-5">
            <div className="flex space-x-10 items-center">
              <div
                onClick={() => navigate("/create-course")}
                className="rounded-xl ring-1 ring-gray-200 px-3 py-1 hover:shadow-md cursor-pointer"
              >
                Mở khóa học mới
              </div>
              <AiOutlineShoppingCart
                onClick={() => navigate("/cart")}
                className="cursor-pointer"
                size={22}
              />
            </div>
          </li>

          {userInfo ? (
            <li className="flex justify-between items-center space-x-5">
              {/* USER PROFILE */}
              <MdLogout
                onClick={signoutHandler}
                className="text-zinc-400"
                size={25}
              />
              <img
                className="relative w-[40px] h-[40px] rounded-2xl object-cover"
                src={
                  "https://cdn.lazi.vn/storage/uploads/users/avatar/273850_1571841685.jpg"
                }
                alt="course"
              />
            </li>
          ) : (
            <li className="flex space-x-10 items-center justify-between">
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
      </div>
    </nav>
  );
};

export default Navbar;
