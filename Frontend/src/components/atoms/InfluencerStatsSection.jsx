import { Grid } from "@mui/material";
import { Event, Schedule, CheckCircle, Cancel } from "@mui/icons-material";
import StatCard from "./StatCard";

const InfluencerStatsSection = ({ stats }) => {
  const cards = [
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: <Event sx={{ color: "#2563eb" }} />,
      bgColor: "#dbeafe",
    },
    {
      title: "Upcoming Bookings",
      value: stats?.upcomingBookings || 0,
      icon: <Schedule sx={{ color: "#d97706" }} />,
      bgColor: "#fef3c7",
    },
    {
      title: "Completed",
      value: stats?.completedBookings || 0,
      icon: <CheckCircle sx={{ color: "#059669" }} />,
      bgColor: "#d1fae5",
    },
    {
      title: "Cancelled",
      value: stats?.cancelledBookings || 0,
      icon: <Cancel sx={{ color: "#dc2626" }} />,
      bgColor: "#fee2e2",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default InfluencerStatsSection;
