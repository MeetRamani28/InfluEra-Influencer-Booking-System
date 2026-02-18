import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../features/auth/AuthActions";
import GoogleLoginButton from "../../components/atoms/GoogleLoginButton";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "USER",
    influencerImage: null,
    city: "",
    price: "",
    followers: "",
    instagram: "",
    categoryName: "",
  });

  // =============================
  // Handle Change
  // =============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // Handle Image Upload
  // =============================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      influencerImage: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  // =============================
  // Handle Submit
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      return toast.error("Please fill all required fields");
    }

    const submitData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    try {
      await dispatch(registerUser(submitData)).unwrap();
      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "Registration Failed");
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
        sx={{ p: 4, maxWidth: 500, width: "100%", borderRadius: 3 }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Create Your Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            margin="normal"
            onChange={handleChange}
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="INFLUENCER">Influencer</MenuItem>
          </TextField>

          {/* =============================
              Influencer Extra Fields
          ============================= */}
          {formData.role === "INFLUENCER" && (
            <>
              <Box mt={2}>
                <Button variant="contained" component="label">
                  Upload Profile Image
                  <input hidden type="file" onChange={handleImageChange} />
                </Button>

                {preview && (
                  <Avatar src={preview} sx={{ width: 80, height: 80, mt: 2 }} />
                )}
              </Box>

              <TextField
                fullWidth
                label="City"
                name="city"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Followers"
                name="followers"
                type="number"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Instagram Link"
                name="instagram"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Category ID"
                name="categoryName"
                margin="normal"
                onChange={handleChange}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.2 }}
          >
            Register
          </Button>
        </Box>

        {/* Google Login for USER */}
        {formData.role === "USER" && (
          <>
            <Divider sx={{ my: 3 }}>OR</Divider>
            <GoogleLoginButton />
          </>
        )}

        <Typography textAlign="center" mt={3} variant="body2">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
