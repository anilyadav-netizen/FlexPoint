import { Routes, Route } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AboutPage from "./pages/AboutPage";
import ProgramPage from "./pages/ProgramPage";
import TrainerPage from "./pages/TrainerPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GalleryPage from "./pages/GalleryPage";
import BlogDetailPage from "./pages/BlogDetailPage";

import AdminLayout from "./Admin/adminLayout/AdminLayout";
import Dashboard from "./Admin/adPages/Dashboard";
import Members from "./Admin/adPages/Members";
import AddMember from "./Admin/adPages/AddMember";
import AdTrainer from "./Admin/adPages/AdTrainer";
import AddTrainers from "./Admin/adPages/AddTrainers";
import AdProgram from "./Admin/adPages/AdProgram";
import AdPremium from "./Admin/adPages/AdPremium";
import AdContact from "./Admin/adPages/AdContact";
import Testimonials from "./Admin/adPages/Testimonials";
import AddReview from "./Admin/adPages/AddReview";
import AdGallery from "./Admin/adPages/AdGallery";
import AdBlog from "./Admin/adPages/AdBlog";
import AddBlogPage from "./Admin/adPages/AddBlogPage";
import AddProgram from "./Admin/adPages/AddProgram";
import Payment from "./Admin/adPages/Payment";
import Attandance from "./Admin/adPages/Attandance";
import Progress from "./Admin/adPages/Progress";
import MyProfile from "./Admin/adPages/MyProfile";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import { clearAuth, getCurrentUser } from "./redux/Slicer/authSlice";

const WebsiteLayout = () => {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramPage />} />
          <Route path="/trainers" element={<TrainerPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (token) {
      console.log("Calling getCurrentUser...");
      dispatch(getCurrentUser());
    } else {
      console.log("No token found");
      dispatch(clearAuth());
    }
  }, [dispatch]);


  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ========================================
                    PUBLIC WEBSITE ROUTES
        ======================================== */}

        <Route path="/*" element={<WebsiteLayout />} />

        {/* ========================================
                    AUTHENTICATION ROUTES
                    No Navbar / Footer
        ======================================== */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ========================================
                    PROTECTED ADMIN ROUTES
        ======================================== */}

        <Route element={<PrivateRoute />}>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>

              <Route index element={<Dashboard />} />

              <Route path="dashboard" element={<Dashboard />} />

              <Route path="members" element={<Members />} />

              <Route path="adtrainers" element={<AdTrainer />} />

              <Route path="adprogram" element={<AdProgram />} />

              <Route path="adPremium" element={<AdPremium />} />

              <Route path="adContact" element={<AdContact />} />

              <Route path="addtrainer" element={<AddTrainers />} />

              <Route path="addmembers" element={<AddMember />} />

              <Route path="payments" element={<Payment />} />

              <Route path="attandance" element={<Attandance />} />

              <Route path="progress" element={<Progress />} />

              <Route path="profile" element={<MyProfile />} />

              <Route path="addprogram" element={<AddProgram />} />

              <Route path="testimonials" element={<Testimonials />} />

              <Route path="addreview" element={<AddReview />} />

              <Route path="adgallery" element={<AdGallery />} />

              <Route path="adblogs" element={<AdBlog />} />

              <Route path="addblogs" element={<AddBlogPage />} />

            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;