import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "../context/Store";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import LoginSocial from "../components/inputs/LoginSocial";
import { ClipLoader } from "react-spinners";
import { HiArrowSmRight } from "react-icons/hi";
import Input from "../components/inputs/Input";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { state, dispatch: ctxDispatch } = useContext(Store) || {};
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    if (ctxDispatch) {
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("user_info", JSON.stringify(data));
      navigate("/");
    }
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
      <h2 className="mb-2 text-3xl font-semibold text-neutral-900 font-display">
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
              errorMessage={false}
            />
            <Input
              id="password"
              placeholder="Password"
              register={register}
              errors={errors}
              required
            />
            <select {...register("role")}>
              <option value="">user</option>
              <option value="admin">admin</option>
              <option value="instructor">instructor</option>
            </select>
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
