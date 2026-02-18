import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  Stack,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { logoutUser } from "../../features/auth/AuthActions";
import logo from "../../../public/images/Influera-icon.jpg";

const influencerLinks = [
  { path: "/user", label: "Home", exact: true },
  { path: "/user/services", label: "services" },
  { path: "/user/blogs", label: "Blogs" },
  { path: "/user/about", label: "About Us" },
  { path: "/user/contact", label: "Contact Us" },
  { path: "/user/bookings", label: "My Bookings" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  if (!isAuthenticated || user?.role !== "USER") return null;

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#111827" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar src={logo} />
            <Typography variant="h6" fontWeight="bold">
              Influ<span style={{ color: "#ff4081" }}>Era</span>
            </Typography>
          </Stack>

          {/* Desktop Links */}
          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {influencerLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.exact}
                style={({ isActive }) => ({
                  color: isActive ? "#ff4081" : "white",
                  textDecoration: "none",
                  fontWeight: 500,
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </Stack>

          {/* Right Section */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Typography variant="body2">
              Hi, <b>{user?.fullName}</b>
            </Typography>

            <Button
              variant="contained"
              size="small"
              onClick={handleLogout}
              disabled={loading}
              sx={{
                backgroundColor: "#ff4081",
                "&:hover": { backgroundColor: "#e91e63" },
              }}
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { md: "none" }, color: "white" }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 3 }}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>

          <Stack spacing={3} mt={2}>
            {influencerLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                style={{
                  textDecoration: "none",
                  color: "#111",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </NavLink>
            ))}

            <Button
              variant="contained"
              onClick={handleLogout}
              disabled={loading}
              sx={{
                backgroundColor: "#ff4081",
                "&:hover": { backgroundColor: "#e91e63" },
              }}
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;
