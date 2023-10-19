import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import User from "./pages/User";
import SignIn from "./pages/SignIn";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/Admin";
import InstructorRoute from "./components/InstructorRoute";
import Instructor from "./pages/Instructor";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import DetailCourse from "./pages/DetailCourse";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer limit={1} className="mt-5" />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/course/:slug" element={<DetailCourse />} />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route
              path="/instructor"
              element={
                <InstructorRoute>
                  <Instructor />
                </InstructorRoute>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
