import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "../context/Store";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { HiArrowSmRight } from "react-icons/hi";
import Input from "../components/inputs/Input";
import axios from "axios";

type User = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { state, dispatch: ctxDispatch } = useContext(Store) || {};
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const onSubmit = async (user: User, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = user;
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          email,
          password,
        }
      );

      // Xử lý khi không có lỗi
      ctxDispatch({ type: "USER_SIGNIN", payload: data.data });
      localStorage.setItem("user_info", JSON.stringify(data.data));
      navigate(redirect || "/");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full p-8 py-12 my-20 mx-auto sm:max-w-lg">
      <div
        onClick={() => navigate("/")}
        className="flex flex-start items-center text-slate-500 text-sm font-bold cursor-pointer"
      >
        <img
          className="relative h-[60px] w-[60px] rounded-xl object-cover mb-5 mr-2"
          src={"/images/logo.png"}
          alt="avatar"
        />
        Course Marketplace <br /> Reviews Platform
      </div>
      <h2 className="mb-2 text-3xl font-semibold text-neutral-900 font-display">
        Tạo tài khoản
      </h2>
      <p className="text-sm text-neutral-500">
        Bạn đã có tài khoản?
        <button
          onClick={() => navigate("/signin")}
          className="text-neutral-900 font-medium hover:underline"
        >
          Hãy đăng nhập tại đây.
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
              required
              rules={{
                minLength: 8,
                maxLength: 24,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹])/,
              }}
              errorMessage={errorMessage}
            />
            <button
              type="submit"
              className="relative overflow-hidden font-semibold inline-flex justify-center items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 shadow-sm text-white py-3 sm:py-2.5 px-3.5 text-sm rounded-md w-full mt-4"
            >
              {isLoading ? (
                <ClipLoader size={25} color="green" />
              ) : (
                <>
                  Đăng ký
                  <HiArrowSmRight size={25} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
