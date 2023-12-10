import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { MdSpaceDashboard } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
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
      name: "Lịch trình",
      icon: GrSchedules,
      link: "/instructor/schedule",
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
      <Sidebar sidebarItems={sidebarItems} />
      {children}
      <Footer />
    </div>
  );
};

export default InstructorLayout;
