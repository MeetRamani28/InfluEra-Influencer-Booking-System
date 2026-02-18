import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Avatar,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../features/auth/AuthActions";
import { fetchCategories } from "../../features/category/CategoryActions";
import GoogleLoginButton from "../../components/atoms/GoogleLoginButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
      if (formData[key]) submitData.append(key, formData[key]);
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
          maxWidth: 500,
          borderRadius: 4,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          textAlign="center"
          mb={4}
          sx={{ color: "#1a1a1a" }}
        >
          Create Your Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* ==================== Full Name ==================== */}
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            margin="normal"
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* ==================== Email ==================== */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
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
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* ==================== Password ==================== */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
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
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* ==================== Role ==================== */}
          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            margin="normal"
            onChange={handleChange}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
            }}
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="INFLUENCER">Influencer</MenuItem>
          </TextField>

          {/* =============================
              Influencer Extra Fields
          ============================= */}
          {formData.role === "INFLUENCER" && (
            <>
              {/* Upload Avatar */}
              <Box
                mt={2}
                mb={2}
                display="flex"
                alignItems="center"
                gap={2}
                flexWrap="wrap"
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1.2,
                    borderRadius: 3,
                    "&:hover": {
                      background: "linear-gradient(90deg, #2575fc, #6a11cb)",
                    },
                  }}
                >
                  Upload Profile Image
                  <input hidden type="file" onChange={handleImageChange} />
                </Button>

                {preview && (
                  <Avatar
                    src={preview}
                    sx={{ width: 80, height: 80, borderRadius: 2 }}
                  />
                )}
              </Box>

              <TextField
                fullWidth
                label="City"
                name="city"
                margin="normal"
                onChange={handleChange}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />

              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                margin="normal"
                onChange={handleChange}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />

              <TextField
                fullWidth
                label="Followers"
                name="followers"
                type="number"
                margin="normal"
                onChange={handleChange}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />

              <TextField
                fullWidth
                label="Instagram Link"
                name="instagram"
                margin="normal"
                onChange={handleChange}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />

              <TextField
                select
                fullWidth
                label="Category"
                name="categoryName"
                value={formData.categoryName}
                margin="normal"
                onChange={handleChange}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              >
                {loading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </>
          )}

          {/* ==================== Submit Button ==================== */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 600,
              background: "linear-gradient(90deg, #11998e, #38ef7d)",
              borderRadius: 3,
              "&:hover": {
                background: "linear-gradient(90deg, #38ef7d, #11998e)",
              },
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            Register
          </Button>
        </Box>

        {/* ==================== Google Login for USER ==================== */}
        {formData.role === "USER" && (
          <>
            <Divider sx={{ my: 4 }}>OR</Divider>
            <GoogleLoginButton />
          </>
        )}

        <Typography
          textAlign="center"
          mt={4}
          variant="body2"
          color="text.secondary"
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2", fontWeight: 500 }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
