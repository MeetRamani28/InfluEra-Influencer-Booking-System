import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, fetchProfile } from "../../features/auth/AuthActions";

const InfluencerTopbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

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
            Influencer Panel
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#64748b", display: { xs: "none", sm: "block" } }}
          >
            Manage your bookings & performance
          </Typography>
        </Box>

        {/* Right Section */}
        <Stack direction="row" spacing={3} alignItems="center">
          {/* User Info */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                bgcolor: "#14b8a6",
                width: 36,
                height: 36,
                fontSize: 14,
              }}
            >
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography fontWeight={600} fontSize={14}>
                {user?.fullName || "Loading..."}
              </Typography>
              <Typography fontSize={12} sx={{ color: "#64748b" }}>
                Influencer
              </Typography>
            </Box>
          </Stack>

          {/* Logout Button */}
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
              "&:hover": {
                backgroundColor: "#e0f2f1",
                borderColor: "#14b8a6",
              },
            }}
          >
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default InfluencerTopbar;
