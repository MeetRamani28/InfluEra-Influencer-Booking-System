import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { NavLink } from "react-router-dom"; // ensure it's react-router-dom

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#111827", color: "white", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Influ<span style={{ color: "#ff4081" }}>Era</span>
            </Typography>
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              InfluEra connects brands with top creators to build powerful,
              authentic marketing campaigns. Grow your influence and monetize
              smarter.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Platform
            </Typography>

            <Stack spacing={1}>
              <NavLink to="/" style={linkStyle}>
                Home
              </NavLink>
              <NavLink to="/user/services" style={linkStyle}>
                Services
              </NavLink>
              <NavLink to="/user/blogs" style={linkStyle}>
                Blogs
              </NavLink>
              <NavLink to="/user/about" style={linkStyle}>
                About Us
              </NavLink>
              <NavLink to="/user/contact" style={linkStyle}>
                Contact Us
              </NavLink>
              <NavLink to="/user/bookings" style={linkStyle}>
                My Bookings
              </NavLink>
            </Stack>
          </Grid>

          {/* Social Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>

            <Stack direction="row" spacing={2}>
              <IconButton sx={iconStyle}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={iconStyle}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={iconStyle}>
                <TwitterIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Copyright */}
        <Box
          sx={{
            borderTop: "1px solid #1f2937",
            mt: 6,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#9ca3af" }}>
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "#ff4081", fontWeight: 500 }}>InfluEra</span>{" "}
            . All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

// Styles for NavLink
const linkStyle = {
  color: "#9ca3af",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": {
    color: "#ff4081",
  },
};

const iconStyle = {
  backgroundColor: "#1f2937",
  color: "white",
  "&:hover": {
    backgroundColor: "#ff4081",
  },
};

export default Footer;
