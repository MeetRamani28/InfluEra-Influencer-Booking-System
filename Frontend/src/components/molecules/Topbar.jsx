import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/AuthActions";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        color: "#0f172a",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
          py: 1.5,
        }}
      >
        {/* Left Section */}
        <Box>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ fontSize: { xs: "16px", md: "20px" } }}
          >
            Admin Panel
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Manage platform settings
          </Typography>
        </Box>

        {/* Right Section */}
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          disabled={loading}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
            fontWeight: 600,
            borderColor: "#14b8a6",
            color: "#14b8a6",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#e0f2f1",
              borderColor: "#14b8a6",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(20, 184, 166, 0.2)",
            },
          }}
        >
          {loading ? "Logging out..." : "Logout"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
