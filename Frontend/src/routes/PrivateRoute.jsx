import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, user, isCheckingAuth } = useSelector(
    (state) => state.auth
  );

  // 🔥 Wait until auth check completes
  if (isCheckingAuth) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
