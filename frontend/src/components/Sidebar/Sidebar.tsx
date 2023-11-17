import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { MdSpaceDashboard } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

interface SidebarItemProps {
  name: string;
  icon: IconType;
  active?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  icon: Icon,
  active,
}) => {
  return (
    <li
      className={`hover:shadow hover:ring-1 hover:ring-gray-200 min-w-[220px] text-base px-10 py-3 rounded-2xl justify-start items-center space-x-4 inline-flex cursor-pointer capitalize    
        ${active ? "bg-emerald-500" : "bg-white"}
        ${active ? "text-white" : "text-zinc-400 "}
      `}
    >
      <Icon size={25} />
      <span className="font-medium">{name}</span>
    </li>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarItems = [
    {
      name: "dashboard",
      icon: MdSpaceDashboard,
      active: true,
    },
    {
      name: "schedule",
      icon: GrSchedules,
      active: false,
    },
    {
      name: "setting",
      icon: IoSettingsOutline,
      active: false,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 h-screen w-[250px] bg-white border border-r-slate-100 shadow-sm">
      <div className="flex items-center justify-center m-5">
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
      </div>
      <ul className="flex flex-col py-2 items-center justify-center space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            active={item.active}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
