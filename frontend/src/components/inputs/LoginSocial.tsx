import { IconType } from "react-icons";

interface LoginSocialProps {
  icon: IconType;
  url: string;
  name: string;
  color: string;
}

const LoginSocial: React.FC<LoginSocialProps> = ({
  icon: Icon,
  url,
  name,
  color,
}) => {
  return (
    <a
      href={url}
      className={`
        relative overflow-hidden font-semibold inline-flex justify-center items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px whitespace-nowrap shadow-sm text-white ring-inset ring-neutral-300 bg-[#282A2F] ring-0  py-3 sm:py-2.5 px-3.5 text-sm rounded-md flex-1 
        ${color}
        hover:!text-neutral-100`}
    >
      <Icon size={20} className="text-base" />
      <span className="sr-only">Login with {name}</span>
    </a>
  );
};

export default LoginSocial;
