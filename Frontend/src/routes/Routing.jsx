import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "../layouts/PublicRoute";
import RoleRedirect from "../components/molecules/RoleRedirect";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import HomePage from "../pages/user/Home";
import InfluencerDashboard from "../pages/influencer/Dashboard";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<RoleRedirect />} />

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

      <Route
        path="/admin"
        element={
          <PrivateRoute role="ADMIN">
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/user"
        element={
          <PrivateRoute role="USER">
            <HomePage />
          </PrivateRoute>
        }
      />

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
