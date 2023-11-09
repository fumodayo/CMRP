import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

interface InstructorLayoutProps {
  children: React.ReactNode;
}

const InstructorLayout: React.FC<InstructorLayoutProps> = ({ children }) => {
  return (
    <div>
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
};

export default InstructorLayout;
