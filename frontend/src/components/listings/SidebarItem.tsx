import { IconType } from "react-icons";

interface SidebarItemProps {
  name: string;
  icon: IconType;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  icon: Icon,
  active,
}) => {
  return (
    <li
      className={`hover:shadow hover:ring-1 hover:ring-gray-200 min-w-[250px] text-base px-10 py-3 rounded-2xl justify-start items-center space-x-4 inline-flex cursor-pointer capitalize    
    ${active ? "bg-emerald-500" : "bg-white"}
    ${active ? "text-white" : "text-zinc-400 "}
    `}
    >
      <Icon size={25} />
      <span className="font-medium">{name}</span>
    </li>
  );
};

export default SidebarItem;
