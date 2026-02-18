import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../features/auth/AuthActions";
import GoogleLoginButton from "../../components/atoms/GoogleLoginButton";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // ==============================
  // Handle Input Change
  // ==============================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==============================
  // Handle Login
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const result = await dispatch(loginUser(formData)).unwrap();
      toast.success("Login Successful");

      // Role-based redirect
      if (result.user.role === "ADMIN") navigate("/admin");
      else if (result.user.role === "USER") navigate("/user");
      else if (result.user.role === "INFLUENCER") navigate("/influencer");
    } catch (error) {
      toast.error(error?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "linear-gradient(135deg, #f0f4ff, #ffffff)",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: { xs: 3, sm: 5 },
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 12px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          textAlign="center"
          mb={4}
          sx={{ color: "#1a1a1a" }}
        >
          Login to Your Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* ==================== Email ==================== */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
            }}
          />

          {/* ==================== Password ==================== */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
            }}
          />

          {/* ==================== Login Button ==================== */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 3,
              background: "linear-gradient(90deg, #11998e, #38ef7d)",
              "&:hover": {
                background: "linear-gradient(90deg, #38ef7d, #11998e)",
              },
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>

        {/* ==================== Divider ==================== */}
        <Divider sx={{ my: 4 }}>OR</Divider>

        {/* ==================== Google Login ==================== */}
        <GoogleLoginButton />

        {/* ==================== Register Link ==================== */}
        <Typography
          textAlign="center"
          mt={4}
          variant="body2"
          color="text.secondary"
        >
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#1976d2", fontWeight: 500 }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
