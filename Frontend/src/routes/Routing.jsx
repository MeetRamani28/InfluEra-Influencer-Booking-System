import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "../layouts/PublicRoute";
import RoleRedirect from "../components/molecules/RoleRedirect";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminBookings from "../pages/admin/Bookings";
import AdminInfluencers from "../pages/admin/Influencers";
import AdminUsers from "../pages/admin/Users";
import AdminCategoies from "../pages/admin/Categories";
import HomePage from "../pages/user/Home";
import InfluencerDashboard from "../pages/influencer/Dashboard";
import InfluencerBookings from "../pages/influencer/Bookings";
import InfluencerProfile from "../pages/influencer/Profile";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import InfluencerLayout from "../layouts/InfluencerLayout";

import Services from "../pages/user/Services";
import Blogs from "../pages/user/Blogs";
import AboutUs from "../pages/user/AboutUs";
import ContactUs from "../pages/user/ContactUs";
import MyBookings from "../pages/user/MyBookings";
import NotFound from "../pages/public/NotFound";

const Routing = () => {
  return (
    <Routes>
      {/* Role Redirect */}
      <Route path="/" element={<RoleRedirect />} />
      <Route path="*" element={<NotFound />} />

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
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="influencers" element={<AdminInfluencers />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="categories" element={<AdminCategoies />} />
      </Route>

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
            <InfluencerLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<InfluencerDashboard />} />
        <Route path="bookings" element={<InfluencerBookings />} />
        <Route path="profile" element={<InfluencerProfile />} />
      </Route>
    </Routes>
  );
};

export default Routing;
