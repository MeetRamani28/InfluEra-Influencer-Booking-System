import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../features/auth/AuthActions";
import GoogleLoginButton from "../../components/atoms/GoogleLoginButton";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ==============================
  // Handle Input Change
  // ==============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      // 🔥 Role-based redirect
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
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
      px={2}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 420,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Login to Your Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2, py: 1.2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        {/* Google Login */}
        <GoogleLoginButton />

        <Typography textAlign="center" mt={3} variant="body2">
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#1976d2" }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
