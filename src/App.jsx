import { Routes, Route } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

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

import AdminLayout from "./Admin/adminLayout/AdminLayout";
import Dashboard from "./Admin/adPages/Dashboard";
import Members from "./Admin/adPages/Members";
import AddMember from "./Admin/adPages/AddMember";
import Trainer from "./pages/Trainer";
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

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* Website Routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/programs" element={<ProgramPage />} />
                  <Route path="/trainers" element={<TrainerPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                </Routes>
              </main>

              <Footer />
            </>
          }
        />

        {/* Admin Routes */}
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

      </Routes>
    </>
  );
}

export default App;