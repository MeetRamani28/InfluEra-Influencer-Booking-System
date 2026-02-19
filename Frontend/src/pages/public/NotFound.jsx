import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* 404 Number */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "5rem", md: "8rem" },
            fontWeight: 800,
            color: "primary.main",
          }}
        >
          404
        </Typography>

        {/* Title */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>

        {/* Description */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sorry, the page you are looking for does not exist or has been moved.
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
