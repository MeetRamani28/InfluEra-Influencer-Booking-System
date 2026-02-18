import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import InfluencerCard from "./InfluencerCard";

const InfluencersGrid = ({
  influencers,
  bookingLoading,
  activeBookingId,
  onBook,
  loading,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (influencers.length === 0) {
    return (
      <Typography textAlign="center" width="100%" mt={5} color="text.secondary">
        No influencers available for this category.
      </Typography>
    );
  }

  return (
    <Grid container spacing={5}>
      {influencers.map((inf) => (
        <Grid item xs={12} sm={6} md={4} key={inf._id}>
          <InfluencerCard
            influencer={inf}
            bookingLoading={bookingLoading}
            activeBookingId={activeBookingId}
            onBook={() => onBook(inf)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default InfluencersGrid;
