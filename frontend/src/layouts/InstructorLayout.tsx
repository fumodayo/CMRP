import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";

interface InstructorLayoutProps {
  children: React.ReactNode;
}

const InstructorLayout: React.FC<InstructorLayoutProps> = ({ children }) => {
  const sidebarItems = [
    {
      name: "Bảng điều hướng",
      icon: MdSpaceDashboard,
      link: "/instructor",
    },
    {
      name: "Review của tôi",
      icon: MdOutlineReviews,
      link: "/instructor/reviews",
    },
    {
      name: "Cài đặt",
      icon: IoSettingsOutline,
      link: "/instructor/settings",
    },
  ];

  return (
    <div>
      <Sidebar role={"instructor"} sidebarItems={sidebarItems} />
      <div className="ml-[90px] 2xl:ml-[280px] 2xl:mr-[50px] my-5 min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default InstructorLayout;
