import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { MdSpaceDashboard } from "react-icons/md";
import { PiCertificateDuotone } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";

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
      name: "CSKH",
      icon: BiSupport,
      link: "/admin/support",
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

export default AdminLayout;
