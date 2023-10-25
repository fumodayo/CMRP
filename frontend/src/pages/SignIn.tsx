import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "../context/Store";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import LoginSocial from "../components/inputs/LoginSocial";
import { ClipLoader } from "react-spinners";
import { HiArrowSmRight } from "react-icons/hi";
import Input from "../components/inputs/Input";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { state, dispatch: ctxDispatch } = useContext(Store) || {};

  const onSubmit = async (user) => {
    setIsLoading(true);
    try {
      const { email, password } = user;
      const { data } = await axios.post(
        "http://localhost:8080/api/user/signin",
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("user_info", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      setErrorMessage(true);
      console.log(error);
    }
    setErrorMessage(false);
    setIsLoading(false);
  };

  const communities = [
    {
      icon: FaGoogle,
      url: "google",
      name: "google",
      color: "hover:!bg-[#ea4335] hover:!ring-[#ea4335]",
    },
  ];

  return (
    <div className="w-full p-8 py-12 my-20 mx-auto sm:max-w-lg">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-semibold text-neutral-400 hover:underline cursor-pointer"
      >
        Logo
      </h1>
      <h2 className="mb-2 text-3xl font-semibold text-neutral-900">
        Đăng nhập
      </h2>
      <p className="text-sm text-neutral-500">
        Bạn không có tài khoản?
        <button
          onClick={() => navigate("/signup")}
          className="text-neutral-900 font-medium hover:underline"
        >
          Hãy tạo mới.
        </button>
      </p>
      <div className="mt-8">
        <div className="space-y-8">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              placeholder="Email Address"
              register={register}
              errors={errors}
              required
              rules={{
                maxLength: 30,
                pattern:
                  // eslint-disable-next-line no-useless-escape
                  /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g,
              }}
              errorMessage={errorMessage}
            />
            <Input
              id="password"
              placeholder="Password"
              register={register}
              errors={errors}
              errorMessage={errorMessage}
              required
            />
            <button
              type="submit"
              className="relative overflow-hidden font-semibold inline-flex justify-center items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 shadow-sm text-white py-3 sm:py-2.5 px-3.5 text-sm rounded-md w-full mt-4"
            >
              {isLoading ? (
                <ClipLoader size={25} color="green" />
              ) : (
                <>
                  Đăng nhập
                  <HiArrowSmRight size={25} className="ml-2" />
                </>
              )}
            </button>
          </form>
          <div className="flex items-center justify-between">
            <span className="w-1/6 border-b lg:w-1/6"></span>
            <div className="text-xs text-center text-neutral-500">
              Hoặc đăng nhập bằng tài khoản google
            </div>
            <span className="w-1/6 border-b lg:w-1/6"></span>
          </div>
          <div className="flex items-center justify-between gap-2 sm:gap-7">
            {communities.map((item, index) => (
              <LoginSocial
                key={index}
                icon={item.icon}
                url={item.url}
                name={item.name}
                color={item.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
