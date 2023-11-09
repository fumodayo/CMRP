import { useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  id: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  errors: FieldErrors;
  errorMessage?: boolean;
  type?: string;
  onChange?: (e: any) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  required,
  register,
  rules,
  errors,
  errorMessage,
  type = "text",
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const error = errors[id];

  return (
    <div className="space-y-1">
      <label className="font-medium text-sm">{placeholder}</label>
      <div className="w-full relative">
        <input
          id={id}
          placeholder={placeholder + "..."}
          {...register(id, { required, ...rules })}
          type={id === "password" ? (showPassword ? "text" : "password") : type}
          onChange={onChange}
          className={`
            w-full 
            block 
            border-0 
            rounded-md 
            shadow-sm 
            text-neutral-900 
            ring-1 
            ring-inset 
            placeholder:text-neutral-400 
            sm:text-sm 
            sm:leading-6 
            disabled:opacity-50
            disabled:pointer-events-none
            py-2.5 
            px-4
            appearance-none
            ${errors[id] ? "ring-red-500" : "ring-neutral-300"}
            ${errors[id] ? "focus:ring-red-500" : "focus:ring-blue-600"}
            ${errorMessage ? "ring-red-500" : "ring-neutral-300"}
            ${errorMessage ? "focus:ring-red-500" : "focus:ring-blue-600"}
        `}
        />
        {id === "password" && (
          <span
            className="
          absolute 
          text-md
          duration-150
          top-0
          right-4
          transform 
          translate-y-3
          z-10
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          text-neutral-600
          cursor-pointer
        "
          >
            {showPassword ? (
              <FaEye onClick={togglePassword} size={18} />
            ) : (
              <FaEyeSlash onClick={togglePassword} size={18} />
            )}
          </span>
        )}
        {error?.type === "required" && (
          <p className="mt-1 text-sm text-red-400">Không được để trống.</p>
        )}
        {id === "email" && error?.type === "pattern" && (
          <p className="mt-1 text-sm text-red-400">Sai định dạng email.</p>
        )}
        {id === "email" && error?.type === "maxLength" && (
          <p className="mt-1 text-sm text-red-400">Chuỗi quá dài.</p>
        )}
        {id === "password" && error?.type === "pattern" && (
          <p className="mt-1 text-sm text-red-400">
            <span className="font-medium mr-1">Mật khẩu phải có:</span>
            Ít nhất ký tự chữ hoa, chữ thường, số và kí hiệu đặt biệt.
          </p>
        )}
        {id === "password" && error?.type === "minLength" && (
          <p className="mt-1 text-sm text-red-400">
            Mật khẩu phải có ít nhất 8 ký tự.
          </p>
        )}
        {id === "password" && error?.type === "maxLength" && (
          <p className="mt-1 text-sm text-red-400">
            Mật khẩu không được dài hơn 24 ký tự.
          </p>
        )}
        {(id === "email" || id === "password") && errorMessage && !error && (
          <p className="mt-1 text-sm text-red-400">
            Tài khoản hoặc mật khẩu không đúng.
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
