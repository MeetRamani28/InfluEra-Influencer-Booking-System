import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import getImageSrc from "../atoms/getImageSrc";

const InfluencerCard = ({
  influencer,
  bookingLoading,
  activeBookingId,
  onBook,
}) => {
  const isLoading = bookingLoading && activeBookingId === influencer._id;

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.05)",
        transition: "all 0.4s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            "0 15px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent sx={{ textAlign: "center", py: 5 }}>
        <Avatar
          src={getImageSrc(influencer.influencerProfile.influencerImage)}
          alt={influencer.fullName}
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto",
            mb: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Typography variant="h6" fontWeight={600} mb={1} sx={{ color: "#333" }}>
          {influencer.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Category: {influencer.influencerProfile.category?.name || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Followers: {influencer.influencerProfile.followers || 0}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${influencer.influencerProfile.price || 0}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", pb: 4 }}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => onBook(influencer._id)}
          disabled={isLoading}
          sx={{
            px: 5,
            py: 1.2,
            fontWeight: 600,
            borderRadius: 3,
            background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
            "&:hover": {
              background: "linear-gradient(90deg, #5b0fc5 0%, #1f63e0 100%)",
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Book Now"
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default InfluencerCard;
