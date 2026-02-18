import { useDispatch } from "react-redux";
import { googleLoginUser } from "../../features/auth/AuthActions";
import { Button, Box, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(googleLoginUser());
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      fullWidth
      startIcon={<GoogleIcon sx={{ fontSize: 24 }} />}
      sx={{
        mt: 1,
        py: 1.5,
        borderRadius: 3,
        fontWeight: 600,
        textTransform: "none",
        background:
          "linear-gradient(90deg, #4285F4, #34A853, #FBBC05, #EA4335)",
        backgroundSize: "300% 300%",
        color: "white",
        boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
        transition: "all 0.4s ease-in-out",
        "&:hover": {
          backgroundPosition: "100% 0",
          boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="button" sx={{ fontWeight: 600 }}>
        Continue with Google
      </Typography>
    </Button>
  );
};

export default GoogleLoginButton;
