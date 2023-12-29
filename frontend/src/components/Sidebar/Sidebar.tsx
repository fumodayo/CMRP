import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { Button } from "antd";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../../context/Store";

interface SidebarItemProps {
  name: string;
  icon: IconType;
  active?: boolean;
  link: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  icon: Icon,
  active,
  link,
}) => {
  return (
    <Link
      to={link}
      className={`hover:shadow hover:ring-1 hover:ring-gray-200 min-w-[220px] text-base px-5 py-3 rounded-xl justify-start items-center space-x-4 inline-flex cursor-pointer capitalize    
        ${active ? "bg-emerald-500" : "bg-white"}
        ${active ? "text-white" : "text-zinc-400 "}
      `}
    >
      <Icon size={25} />
      <span className="font-medium">{name}</span>
    </Link>
  );
};

const Sidebar = ({ role, sidebarItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { dispatch: ctxDispatch } = useContext(Store) || {};

  const signoutHandler = async () => {
    await axios.get("http://localhost:8080/api/auth/logout", {
      withCredentials: true,
    });
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("user_info");
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-[250px] bg-white border border-r-slate-100 shadow-sm">
      <div className="flex items-center justify-center m-5">
        <div
          onClick={() => navigate(`/`)}
          className="flex flex-start items-center text-slate-500 text-sm font-bold cursor-pointer"
        >
          <img
            className="relative h-[60px] w-[60px] rounded-xl object-cover mb-5 mr-2"
            src={"/images/logo.png"}
            alt="avatar"
          />
          Course Marketplace <br /> Reviews Platform
        </div>
      </div>
      <ul className="flex flex-col py-2 items-left justify-center p-5 space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            active={item.link === currentPath}
            link={item.link}
          />
        ))}
        <Button danger onClick={signoutHandler}>
          Thoát ra
        </Button>
      </ul>
    </nav>
  );
};

export default Sidebar;
