import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { MdSpaceDashboard } from "react-icons/md";
import { PiCertificateDuotone } from "react-icons/pi";
import { ImBooks } from "react-icons/im";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const sidebarItems = [
    {
      name: "Bảng điều hướng",
      icon: MdSpaceDashboard,
      link: "/admin",
    },
    {
      name: "Giấy chứng nhận",
      icon: PiCertificateDuotone,
      link: "/admin/certificate",
    },
    {
      name: "Khóa học",
      icon: ImBooks,
      link: "/admin/course",
    },
  ];

  return (
    <div>
      <Sidebar role="admin" sidebarItems={sidebarItems} />
      <div className="ml-[90px] 2xl:ml-[280px] 2xl:mr-[50px] my-5 min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
