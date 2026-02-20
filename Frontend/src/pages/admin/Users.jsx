// Users.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  createUser,
  updateUserByAdmin,
  deleteUserByAdmin,
} from "../../features/users/UserActions";
import { clearError, clearSuccess } from "../../features/users/UserSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, successMessage } = useSelector(
    (state) => state.users
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

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

  const handleOpenCreate = () => {
    setEditUser(null);
    setFormData({ fullName: "", email: "", password: "" });
    setOpenDialog(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      password: "",
    });
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserByAdmin(id));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const payload = { ...formData, role: "USER" };

    if (editUser) {
      dispatch(updateUserByAdmin({ id: editUser._id, updateData: payload }));
    } else {
      dispatch(createUser(payload));
    }
    setOpenDialog(false);
  };

  const normalUsers = users.filter((u) => u.role === "USER");

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={4}>
          Users Management
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreate}
          sx={{ mb: 3 }}
        >
          Add User
        </Button>

        {loading && (
          <Box textAlign="center" mt={6}>
            <CircularProgress />
          </Box>
        )}

        {!loading && normalUsers.length === 0 && (
          <Typography color="text.secondary">No users found.</Typography>
        )}

        <Grid container spacing={3}>
          {normalUsers.map((user) => (
            <Grid item xs={12} md={6} key={user._id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {user.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {user.email}
                  </Typography>

                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add/Edit User Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            {!editUser && (
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {editUser ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

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

export default Users;
