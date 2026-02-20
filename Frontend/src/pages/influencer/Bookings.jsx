import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfluencerBookings,
  updateBookingStatus,
} from "../../features/booking/BookingActions";
import { clearBookingState } from "../../features/booking/BookingSlice";

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error, success } = useSelector(
    (state) => state.booking
  );

  const [openToast, setOpenToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    dispatch(getInfluencerBookings());
  }, [dispatch]);

  // Handle Success & Error Toast
  useEffect(() => {
    if (success) {
      setToastType("success");
      setToastMessage("Booking updated successfully!");
      setOpenToast(true);
      dispatch(clearBookingState());
    }

    if (error) {
      setToastType("error");
      setToastMessage(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong"
      );
      setOpenToast(true);
      dispatch(clearBookingState());
    }
  }, [success, error, dispatch]);

  const handleUpdateStatus = (id, status) => {
    dispatch(updateBookingStatus({ id, status }));
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";
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

  // Determine available actions based on current status
  const getActions = (status, id) => {
    switch (status) {
      case "PENDING":
        return (
          <>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={() => handleUpdateStatus(id, "CONFIRMED")}
              sx={{ mr: 1 }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Confirm"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleUpdateStatus(id, "CANCELLED")}
              disabled={loading}
            >
              {loading ? "Updating..." : "Cancel"}
            </Button>
          </>
        );
      case "CONFIRMED":
        return (
          <>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleUpdateStatus(id, "COMPLETED")}
              sx={{ mr: 1 }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Complete"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleUpdateStatus(id, "CANCELLED")}
              disabled={loading}
            >
              {loading ? "Updating..." : "Cancel"}
            </Button>
          </>
        );
      case "COMPLETED":
      case "CANCELLED":
        return null; // No actions allowed
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={4}>
          My Bookings
        </Typography>

        {/* Loading */}
        {loading && (
          <Box textAlign="center" mt={6}>
            <CircularProgress />
          </Box>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <Typography color="text.secondary">No bookings found.</Typography>
        )}

        {/* Booking List */}
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
                    {/* Left */}
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" fontWeight={600}>
                        {booking.user?.fullName || "User"}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Date:{" "}
                        {new Date(booking.appointmentDate).toLocaleDateString()}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Time:{" "}
                        {new Date(booking.appointmentDate).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Typography>
                    </Grid>

                    {/* Right */}
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

                      <Box>{getActions(booking.status, booking._id)}</Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Toast Notification */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toastType}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Bookings;
