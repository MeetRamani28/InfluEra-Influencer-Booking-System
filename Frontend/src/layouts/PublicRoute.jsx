import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useSelector(
    (state) => state.auth
  );

  if (isCheckingAuth) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    switch (user?.role) {
      case "ADMIN":
        return <Navigate to="/admin" replace />;
      case "USER":
        return <Navigate to="/user" replace />;
      case "INFLUENCER":
        return <Navigate to="/influencer" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PublicRoute;
