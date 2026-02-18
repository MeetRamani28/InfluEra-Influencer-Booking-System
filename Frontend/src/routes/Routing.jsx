import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "../layouts/PublicRoute";
import RoleRedirect from "../components/molecules/RoleRedirect";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import HomePage from "../pages/user/Home";
import InfluencerDashboard from "../pages/influencer/Dashboard";

import UserLayout from "../layouts/UserLayout";

// import missing pages
import Services from "../pages/user/Services";
import Blogs from "../pages/user/Blogs";
import AboutUs from "../pages/user/AboutUs";
import ContactUs from "../pages/user/ContactUs";
import MyBookings from "../pages/user/MyBookings";

const Routing = () => {
  return (
    <Routes>
      {/* Role Redirect */}
      <Route path="/" element={<RoleRedirect />} />

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute role="ADMIN">
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* User Section with Nested Routes */}
      <Route
        path="/user"
        element={
          <PrivateRoute role="USER">
            <UserLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="services" element={<Services />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="bookings" element={<MyBookings />} />
      </Route>

      {/* Influencer */}
      <Route
        path="/influencer"
        element={
          <PrivateRoute role="INFLUENCER">
            <InfluencerDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
