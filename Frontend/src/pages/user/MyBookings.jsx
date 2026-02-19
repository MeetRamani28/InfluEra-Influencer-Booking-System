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
  Container,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";
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

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "success";
      case "CANCELLED":
        return "error";
      case "PENDING":
        return "warning";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f8fafc", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={1} mb={5} textAlign="center">
          <Typography variant="h4" fontWeight={700}>
            My Bookings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track all your influencer appointments
          </Typography>
        </Stack>

        {error && (
          <Typography color="error" textAlign="center" mb={3}>
            {error}
          </Typography>
        )}

        {!bookings || bookings.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: "#ffffff",
            }}
          >
            <EventAvailableIcon sx={{ fontSize: 60, color: "#d1d5db" }} />
            <Typography variant="h6" mt={2}>
              No Bookings Yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start booking influencers to see them here.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {bookings.map((booking) => {
              const canCancel = booking.status === "PENDING";

              return (
                <Grid item xs={12} sm={6} md={4} key={booking._id}>
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 4,
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <CardContent>
                      <Stack spacing={1.5}>
                        <Typography variant="h6" fontWeight={600}>
                          {booking.influencer?.fullName || "Influencer"}
                        </Typography>

                        <Divider />

                        <Typography variant="body2" color="text.secondary">
                          📅{" "}
                          {new Date(booking.appointmentDate).toLocaleString()}
                        </Typography>

                        <Typography variant="body2">
                          📝 {booking.notes || "No notes added"}
                        </Typography>

                        <Chip
                          label={booking.status}
                          color={getStatusColor(booking.status)}
                          sx={{ width: "fit-content", mt: 1 }}
                        />
                      </Stack>
                    </CardContent>

                    {canCancel && (
                      <CardActions sx={{ px: 2, pb: 2 }}>
                        <Button
                          variant="outlined"
                          color="error"
                          fullWidth
                          startIcon={<CancelIcon />}
                          onClick={() => handleCancel(booking._id)}
                        >
                          Cancel Booking
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MyBookings;
