// AdminBookings.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  createBooking,
} from "../../features/booking/BookingActions";
import { clearBookingState } from "../../features/booking/BookingSlice";
import { fetchAllUsers } from "../../features/users/UserActions";

const AdminBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error, success } = useSelector(
    (state) => state.booking
  );
  const { users } = useSelector((state) => state.users);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  // Create Booking dialog state
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newBooking, setNewBooking] = useState({
    userId: "",
    influencerId: "",
    appointmentDate: "",
    status: "CONFIRMED",
  });

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setToastType("success");
      setToastMessage("Action performed successfully!");
      setToastOpen(true);
      dispatch(clearBookingState());
    }
    if (error) {
      setToastType("error");
      setToastMessage(error);
      setToastOpen(true);
      dispatch(clearBookingState());
    }
  }, [success, error, dispatch]);

  const handleStatusChange = (id, status) => {
    dispatch(updateBookingStatus({ id, status }));
  };

  const handleDelete = (id) => {
    dispatch(deleteBooking(id));
  };

  const handleCreateChange = (e) => {
    setNewBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateSubmit = () => {
    if (
      !newBooking.userId ||
      !newBooking.influencerId ||
      !newBooking.appointmentDate
    ) {
      setToastType("error");
      setToastMessage("Please fill all fields!");
      setToastOpen(true);
      return;
    }
    dispatch(createBooking(newBooking));
    setOpenCreateDialog(false);
    setNewBooking({
      userId: "",
      influencerId: "",
      appointmentDate: "",
      status: "CONFIRMED",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "success";
      case "CANCELLED":
        return "error";
      case "COMPLETED":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={4}>
          Admin Bookings
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateDialog(true)}
          sx={{ mb: 3 }}
        >
          Create Booking
        </Button>

        {loading && (
          <Box textAlign="center" mt={6}>
            <CircularProgress />
          </Box>
        )}

        {!loading && bookings.length === 0 && (
          <Typography color="text.secondary">No bookings found.</Typography>
        )}

        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} key={booking._id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" fontWeight={600}>
                        {booking.user?.fullName || "User"} →{" "}
                        {booking.influencer?.fullName || "Influencer"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date:{" "}
                        {new Date(booking.appointmentDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Time:{" "}
                        {new Date(booking.appointmentDate).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={4}
                      textAlign={{ xs: "left", md: "right" }}
                      mt={{ xs: 2, md: 0 }}
                    >
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        sx={{ fontWeight: 600, mb: 2 }}
                      />
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {booking.status !== "COMPLETED" &&
                          booking.status !== "CANCELLED" && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                handleStatusChange(booking._id, "COMPLETED")
                              }
                            >
                              Complete
                            </Button>
                          )}
                        {booking.status !== "CANCELLED" && (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() =>
                              handleStatusChange(booking._id, "CANCELLED")
                            }
                          >
                            Cancel
                          </Button>
                        )}
                        {booking.status !== "CONFIRMED" &&
                          booking.status !== "CANCELLED" && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                handleStatusChange(booking._id, "CONFIRMED")
                              }
                            >
                              Confirm
                            </Button>
                          )}
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => handleDelete(booking._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Create Booking Dialog */}
        <Dialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
        >
          <DialogTitle>Create Booking</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            {/* User Dropdown */}
            <TextField
              select
              label="Select User"
              name="userId"
              value={newBooking.userId}
              onChange={handleCreateChange}
              fullWidth
            >
              <MenuItem value="">-- Select User --</MenuItem>
              {users
                .filter((u) => u.role === "USER")
                .map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.fullName} ({user.email})
                  </MenuItem>
                ))}
            </TextField>

            {/* Influencer Dropdown */}
            <TextField
              select
              label="Select Influencer"
              name="influencerId"
              value={newBooking.influencerId}
              onChange={handleCreateChange}
              fullWidth
            >
              <MenuItem value="">-- Select Influencer --</MenuItem>
              {users
                .filter((u) => u.role === "INFLUENCER")
                .map((influencer) => (
                  <MenuItem key={influencer._id} value={influencer._id}>
                    {influencer.fullName} ({influencer.email})
                  </MenuItem>
                ))}
            </TextField>

            <TextField
              label="Appointment Date"
              name="appointmentDate"
              type="datetime-local"
              value={newBooking.appointmentDate}
              onChange={handleCreateChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateSubmit} variant="contained">
              Create
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

export default AdminBookings;
