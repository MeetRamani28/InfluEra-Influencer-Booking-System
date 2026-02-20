import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyProfile,
  updateMyProfile,
} from "../../features/users/UserActions";
import { clearError, clearSuccess } from "../../features/users/UserSlice";
import getImageSrc from "../../components/atoms/getImageSrc";

const InfluencerProfile = () => {
  const dispatch = useDispatch();
  const { myProfile, loading, error, successMessage } = useSelector(
    (state) => state.users
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    city: "",
    price: "",
    followers: "",
    instagram: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (myProfile) {
      const profile = myProfile.influencerProfile || {};
      setFormData({
        fullName: myProfile.fullName || "",
        email: myProfile.email || "",
        city: profile.city || "",
        price: profile.price || "",
        followers: profile.followers || "",
        instagram: profile.instagram || "",
        category: profile.category.name || "",
      });
      setImagePreview(getImageSrc(profile.influencerImage));
    }
  }, [myProfile]);

  useEffect(() => {
    if (successMessage) {
      setToastType("success");
      setToastMessage(successMessage);
      setToastOpen(true);
      dispatch(clearSuccess());
    }
    if (error) {
      setToastType("error");
      setToastMessage(error);
      setToastOpen(true);
      dispatch(clearError());
    }
  }, [successMessage, error, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("fullName", formData.fullName);
    updatedData.append("email", formData.email);
    updatedData.append("influencerProfile[city]", formData.city);
    updatedData.append("influencerProfile[price]", formData.price);
    updatedData.append("influencerProfile[followers]", formData.followers);
    updatedData.append("influencerProfile[instagram]", formData.instagram);
    updatedData.append("influencerProfile[category]", formData.category);
    if (imageFile)
      updatedData.append("influencerProfile[influencerImage]", imageFile);

    dispatch(updateMyProfile(updatedData));
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} mb={4}>
          My Profile
        </Typography>

        {loading && (
          <Box textAlign="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {!loading && (
          <Card sx={{ borderRadius: 4, p: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={3}>
                <Avatar src={imagePreview} sx={{ width: 120, height: 120 }} />
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Followers"
                      name="followers"
                      type="number"
                      value={formData.followers}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" component="label">
                      Upload Avatar
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        <Snackbar
          open={toastOpen}
          autoHideDuration={3000}
          onClose={() => setToastOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setToastOpen(false)}
            severity={toastType}
            sx={{ width: "100%" }}
          >
            {toastMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default InfluencerProfile;
