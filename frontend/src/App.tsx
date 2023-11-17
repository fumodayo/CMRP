import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/admin/Admin";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import DetailCourse from "./pages/DetailCourse";
import Profile from "./pages/user/Profile";
import Checkout from "./pages/Checkout";
import CreateCourse from "./pages/user/CreateCourse";
import Certificate from "./pages/user/Certificate";
import Review from "./pages/Review";
import Instructor from "./pages/instructor/Instructor";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer limit={1} className="mt-5" />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/course/:id" element={<DetailCourse />} />
            <Route path="/review" element={<Review />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-course"
              element={
                <ProtectedRoute>
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/certificate"
              element={
                <ProtectedRoute>
                  <Certificate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor"
              element={
                <ProtectedRoute>
                  <Instructor />
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

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
