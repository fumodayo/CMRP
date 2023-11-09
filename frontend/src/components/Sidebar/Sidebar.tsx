import { IconType } from "react-icons";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { LuActivitySquare } from "react-icons/lu";

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
  const sidebarItems = [
    {
      name: "dashboard",
      icon: MdSpaceDashboard,
      active: true,
    },
    {
      name: "courses",
      icon: FaBookOpen,
      active: false,
    },
    {
      name: "schedule",
      icon: AiFillSchedule,
      active: false,
    },
    {
      name: "instructors",
      icon: BsFillPeopleFill,
      active: false,
    },
    {
      name: "profile",
      icon: BiSolidUser,
      active: false,
    },
    {
      name: "activity",
      icon: LuActivitySquare,
      active: false,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 h-screen w-[250px] bg-white border border-r-slate-100 shadow-sm">
      <div className="flex items-center justify-center m-5">
        <span className="text-slate-700 text-4xl font-bold">Logo.</span>
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
