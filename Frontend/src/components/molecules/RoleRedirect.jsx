import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleRedirect = () => {
  const { isAuthenticated, user, isCheckingAuth } = useSelector(
    (state) => state.auth
  );

  if (isCheckingAuth) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (user?.role) {
    case "ADMIN":
      return <Navigate to="/admin" replace />;
    case "USER":
      return <Navigate to="/user" replace />;
    case "INFLUENCER":
      return <Navigate to="/influencer" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default RoleRedirect;
