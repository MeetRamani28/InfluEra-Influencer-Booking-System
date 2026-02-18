import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import bg from "../../../public/images/Influera-icon.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        color: "white",
        overflow: "hidden",
        paddingTop: "80px"
      }}
    >
      {/* Background */}
      <Box
        component="img"
        src={bg}
        alt="InfluEra Background"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%)",
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg">
        <Box maxWidth="700px">
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              lineHeight: 1.2,
            }}
          >
            Empowering Brands to Collaborate with{" "}
            <span style={{ color: "#ff4081" }}>Top Creators</span>
          </Typography>

          <Typography
            mt={3}
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#d1d5db",
              maxWidth: "600px",
            }}
          >
            InfluEra bridges the gap between brands and influencers. Launch
            impactful campaigns, grow your digital presence, and unlock new
            revenue opportunities — all in one platform.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mt={5}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#ff4081",
                px: 5,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "#e91e63",
                },
              }}
              onClick={() => navigate("/user/services")}
            >
              Explore Campaigns
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "white",
                color: "white",
                px: 5,
                py: 1.5,
                borderRadius: 3,
                "&:hover": {
                  borderColor: "#ff4081",
                  color: "#ff4081",
                },
              }}
              onClick={() => navigate("/user/about")}
            >
              Learn More
            </Button>
          </Stack>

          {/* Small Trust Line */}
          <Typography
            mt={4}
            sx={{
              fontSize: "0.9rem",
              color: "#9ca3af",
            }}
          >
            Trusted by 500+ Brands & 10,000+ Influencers worldwide.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
