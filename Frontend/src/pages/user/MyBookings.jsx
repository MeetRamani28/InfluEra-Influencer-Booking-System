import { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyBookings,
  cancelBooking,
} from "../../features/booking/BookingActions";
import { toast } from "react-toastify";

const MyBookings = () => {
  const dispatch = useDispatch();

  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  const handleCancel = async (id) => {
    try {
      await dispatch(cancelBooking(id)).unwrap();
      toast.success("Booking cancelled successfully");
    } catch (err) {
      toast.error(err || "Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">You have no bookings yet.</Typography>
      </Box>
    );
  }

  return (
    <Box px={{ xs: 2, md: 5 }} py={6} bgcolor="#f3f6f8" minHeight="100vh">
      <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
        My Bookings
      </Typography>

      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} md={6} lg={4} key={booking._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {booking.influencer?.fullName || "Influencer"}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>
                  Category:{" "}
                  {booking.influencer?.influencerProfile?.category?.name ||
                    "N/A"}
                </Typography>
                <Typography variant="body2" mb={1}>
                  Date: {new Date(booking.appointmentDate).toLocaleString()}
                </Typography>
                <Typography variant="body2" mb={1}>
                  Notes: {booking.notes || "-"}
                </Typography>
                <Chip
                  label={booking.status}
                  color={
                    booking.status === "CONFIRMED"
                      ? "success"
                      : booking.status === "CANCELLED"
                      ? "default"
                      : "warning"
                  }
                />
              </CardContent>
              <CardActions>
                {booking.status !== "CANCELLED" && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyBookings;
