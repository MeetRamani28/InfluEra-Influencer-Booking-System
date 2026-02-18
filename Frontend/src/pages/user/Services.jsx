// src/pages/services/Services.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/category/categoryActions";
import { fetchAllInfluencers } from "../../features/influencer/influencerActions";
import { createBooking } from "../../features/booking/BookingActions";
import { toast } from "react-toastify";

import CategoryFilter from "../../components/atoms/CategoryFilter";
import InfluencersGrid from "../../components/atoms/InfluencersGrid";

const Services = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { influencers, loadingInfluencers } = useSelector(
    (state) => state.influencer
  );
  const { loading: bookingLoading } = useSelector((state) => state.booking);

  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeInfluencer, setActiveInfluencer] = useState(null);
  const [notes, setNotes] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  // Fetch categories and influencers on mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllInfluencers());
  }, [dispatch]);

  // Handle booking submission
  const handleBooking = async () => {
    if (!appointmentDate) {
      toast.error("Please select a date and time for the booking");
      return;
    }

    if (!activeInfluencer || !activeInfluencer._id) {
      toast.error("Influencer data missing");
      return;
    }

    const payload = {
      influencerId: activeInfluencer._id, // Send influencer ID explicitly
      appointmentDate,
      notes,
    };

    console.log("Booking Payload:", payload); // debug payload

    try {
      await dispatch(createBooking(payload)).unwrap();
      toast.success("Booking created successfully!");
      // Reset state after successful booking
      setActiveInfluencer(null);
      setNotes("");
      setAppointmentDate("");
    } catch (err) {
      toast.error(err || "Booking failed");
    }
  };

  // Filter influencers by selected category
  const filteredInfluencers =
    selectedCategory === "ALL"
      ? influencers
      : influencers.filter(
          (inf) =>
            inf.influencerProfile.category &&
            inf.influencerProfile.category._id === selectedCategory
        );

  return (
    <Box px={{ xs: 2, md: 5 }} py={6} bgcolor="#f3f6f8" minHeight="100vh">
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        mb={4}
        sx={{ color: "#111" }}
      >
        Explore Our Influencers
      </Typography>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Influencers Grid */}
      <InfluencersGrid
        influencers={filteredInfluencers}
        bookingLoading={bookingLoading}
        activeBookingId={activeInfluencer?._id}
        onBook={(influencer) => setActiveInfluencer(influencer)}
        loading={loadingInfluencers}
      />

      {/* Booking Dialog */}
      {activeInfluencer && (
        <Dialog open onClose={() => setActiveInfluencer(null)}>
          <DialogTitle>Book {activeInfluencer.fullName}</DialogTitle>
          <DialogContent sx={{ mt: 1 }}>
            <TextField
              label="Appointment Date & Time"
              type="datetime-local"
              fullWidth
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Booking Notes"
              fullWidth
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes for the influencer..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActiveInfluencer(null)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleBooking}
              disabled={bookingLoading}
            >
              {bookingLoading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Services;
